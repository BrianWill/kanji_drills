const db = require('knex')({
    client: 'sqlite3',
    useNullAsDefault: false,
    connection: {
        filename: "./data/data.sqlite"
    }
});
const greenState = 1;
const redState = 0;
const blackState = 2;
const blueState = 3;
const whiteState = 4;

const unmarked = 0;
const marked = 1;

const stateClass = {
    '0': 'red',
    '1': 'green',
    '2': 'black',
    '3': 'blue',
    '4': 'white'
};

var cardDataByUUID = {};   // the data loaded from JSON, which does not include DB row info
var kanjiCards = [];
var allListsByID = {};

async function loadEverything() {
    cardDataByUUID = {};   // the data loaded from JSON, which does not include DB row info
    cardIDByUUID = {};
    kanjiCards = [];
    allListsByID = {};

    // load all cards
    var rows = await db.from('card').select();
    for (var row of rows) {
        var card = JSON.parse(row.data);
        card.marking = row.marking;
        cardDataByUUID[card.uuid] = card;
        kanjiCards.push(card);        
    }

    // load all lists
    var lists = await db.from('list');
    for (let list of lists) {
        list.cards = await getCardsOfList(list.id);
        allListsByID[list.id] = list;
    }
}

async function setListState(list, state, ele) {
    if (ele) {
        ele.classList.remove('green');
        ele.classList.remove('red');
        ele.classList.remove('black');
        ele.classList.add(stateClass[state]);
    }
    list.state = state;
    list.last_marked = unixtime();
    await db('list').where({ id: list.id }).update({ state: state, last_marked: list.last_marked });
}

async function getCardsOfList(listId) {
    var rows = await db.from('card_by_list').where({ list_id: listId });
    var cards = [];
    for (var row of rows) {
        var card = {
            data: cardDataByUUID[row.card_uuid],
            id: row.id,
            state: row.state,
            pair: row.pair
        };
        cards.push(card);
    }
    return cards;
}

async function updateCardData(card) {
    await db('card').where({ uuid: card.data.uuid }).update({ data: JSON.stringify(card.data) });
}

async function createList(name, creation_date) {
    creation_date = creation_date || unixtime();
    var ids = await db('list').insert(
        {
            name: name, 
            last_marked: creation_date, 
            state: blackState
        }
    );
    var lists = await db('list').where({ id: ids[0] });
    var list = lists[0];
    list.cards = [];
    allListsByID[list.id] = list;
    return list;
}

async function setCardState(state, cards, list) {
    for (let card of cards) {
        if (state !== undefined) {
            card.state = state;
            await db('card_by_list').where({ card_uuid: card.data.uuid, list_id: list.id }).update({ state: state });
        }
    }
}

async function addCardsToList(list, cardUUIDs) {
    for (let uuid of cardUUIDs) {
        // check if card already exists in list first
        let exists = false;
        for (let other of list.cards) {
            if (other.data.uuid === uuid) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            list.cards.push({
                data: cardDataByUUID[uuid],
                state: blackState
            });
            await db('card_by_list').insert({ card_uuid: uuid, list_id: list.id, state: blackState });
        }
    }
}

async function setCardPair(list, cardUUID, pairUUID) {
    await db('card_by_list').where({ card_uuid: cardUUID, list_id: list.id}).update({pair: pairUUID});
}

async function removeCardsFromList(list, cardUUIDs) {
    for (let uuid of cardUUIDs) {
        console.log(`removing card: ${list.id} ${uuid}`);
        await db('card_by_list').where({ card_uuid: uuid, list_id: list.id }).del();
    }
}

async function deleteAllLists() {
    let lists = Object.values(allListsByID);
    for (let list of lists) {
        await deleteList(list);
    }
}

async function setCardMarking(cardUUID, marking) {
    if (marking !== unmarked && marking !== marked) {
        throw `invalid mark state: ${cardUUID}`;
    }
    await db('card').where({ uuid: cardUUID }).update({ marking: marking });
    cardDataByUUID[cardUUID].marking = marking;
}

// does not destroy any cards, only the list itself
async function deleteList(list) {
    await db('card_by_list').where({ list_id: list.id }).del();
    await db('list').where({ id: list.id }).del();
    delete allListsByID[list.id];
    console.log(`deleting list: "${list.id} ${list.name}"`);
}