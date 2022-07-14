const { NodeEventEmitter, shell } = require("electron");

const secondsInHour = 60 * 60;
const secondsInDay = secondsInHour * 24;
const secondsInWeek = secondsInDay * 7;

var menuDiv = document.getElementById('menu');
var listMenuDiv = document.getElementById('list_menu');
var quizDiv = document.getElementById('quiz');
var quizHeaderDiv = document.getElementById('quiz_header');
var quizItemsDiv = document.getElementById('quiz_items');
var currentListLink = document.getElementById('current_list_link');
var cardActions = document.getElementById('card_actions');

var currentItemIdx = null;
var currentList = null;

document.body.onkeydown = async function (evt) {
    if (currentList) {
        var ele = quizItemsDiv.children[currentItemIdx];
        var card = getCurrentCard();
        evt.preventDefault();
        if (evt.code === 'Space') {
            ele.classList.remove('redState');
            ele.classList.remove('greenState');
            revealAnswer(ele);
            await setCardState(blackState, [card], currentList);
        } else if (evt.key === 'Escape') {
            presentListMenu();
        } else if ((evt.key === 'ArrowLeft' && evt.altKey) || evt.key === 'Home') {
            setCurrentItem(0, true);
        } else if ((evt.key === 'ArrowRight' && evt.altKey) || evt.key === 'End') {
            setCurrentItem(quizItemsDiv.children.length - 1, true);
        } else if (evt.key === 'ArrowRight') {
            ele.classList.add('greenState');
            ele.classList.remove('redState');
            revealAnswer(ele);
            await setCardState(greenState, [card], currentList);
        } else if (evt.key === 'ArrowLeft') {
            ele.classList.add('redState');
            ele.classList.remove('greenState');
            revealAnswer(ele);
            await setCardState(redState, [card], currentList);
        } else if (evt.key === 'ArrowDown') {
            nextItem(evt.altKey ? 4 : 1);
        } else if (evt.key === 'ArrowUp') {
            prevItem(evt.altKey ? 4 : 1);
        } else if (evt.code === 'KeyL' && evt.altKey) {
            console.log(card);
            shell.openExternal('https://www.wanikani.com/kanji/' + card.data.character);
            shell.openExternal('https://jisho.org/search/' + card.data.character);
        } else if (evt.key === 'Shift') {
            playWord(card);
        } else if (evt.key === 'Enter' && evt.altKey) {
            presentQuiz(currentList, true);
        }
    } else {
        if ((evt.key === 'ArrowLeft' && evt.altKey) || evt.key === 'Home') {
            evt.preventDefault();
            window.scrollTo(0, 0);
        } else if ((evt.key === 'ArrowRight' && evt.altKey) || evt.key === 'End') {
            evt.preventDefault();
            window.scrollTo(0, document.body.scrollHeight);
        } else if (evt.key === 'r' && evt.altKey) {
            evt.preventDefault();
            reviewRed();
        } else if (evt.key === 'Enter' && evt.altKey) {
            evt.preventDefault();
            presentListMenu(false);
        }
    }
};

listMenuDiv.onmousedown = async function (evt) {
    evt.preventDefault();
    var listEle = evt.target.closest('.list_entry');
    if (!listEle) {
        return;
    }
    var c = evt.target.classList;
    var listId = parseInt(listEle.getAttribute('list_id'));
    var list = allListsByID[listId];
    if (c.contains('mark_black')) {
        setListState(list, blackState, listEle);
        presentListMenu(true);
    } else if (c.contains('mark_red')) {
        setListState(list, redState, listEle);
        presentListMenu(true);
    } else if (c.contains('mark_green')) {
        setListState(list, greenState, listEle);
        presentListMenu(true);
    } else if (c.contains('list_link')) {
        presentQuiz(list, true);
    }
};


cardActions.onclick = async function (evt) {
    evt.preventDefault();
    var c = evt.target.classList;
    if (c.contains('back_to_list')) {
        presentListMenu(false);
    } else if (c.contains('set_black')) {
        let cards = currentList.cards;
        await setCardState(blackState, cards, currentList);
        presentQuiz(currentList, false);
    } else if (c.contains('set_red_to_black')) {
        let cards = currentList.cards.filter(x => x.state === redState);
        await setCardState(blackState, cards, currentList);
        presentQuiz(currentList, false);
    }
};

function presentListMenu(noScroll) {
    currentList = null;
    let lists = Object.values(allListsByID);
    lists.sort(function (a, b) { 
        if (b.name === a.name) {
            return 0;
        }
        return (b.name > a.name) ? -1 : 1;
    });

    let red = [];
    let black = [];
    let green = [];
    for (let list of lists) {
        switch (list.state) {
            case redState:
                red.push(list);
                break;
            case blackState:
                black.push(list);
                break;
            case greenState:
                green.push(list);
                break;
        }
    }

    red.sort(function (a, b) { 
        return b.last_marked - a.last_marked;
    });

    green.sort(function (a, b) { 
        return b.last_marked - a.last_marked;
    });

    lists = red.concat(green, black);

    var html = '';
    for (var list of lists) {
        let listState = stateClass[list.state];
        let date = '';
        if (list.state === greenState || list.state === redState) {
            date = unixtimeToDate(list.last_marked).toLocaleDateString('en-us', { 
                    year:"numeric", month:"short", day:"numeric"}) ;
                    // "Friday, Jul 2, 2021"
        }
        let actions = '';
        switch (list.state) {
            case redState:
                actions = `<a class="mark_green" title="Mark the list as green">mark green</a>
                        <a class="mark_black" title="Mark the list as black">mark black</a>`;
                break;
            case greenState:
                actions = `<a class="mark_red" title="Mark the list as red">mark red</a>
                        <a class="mark_black" title="Mark the list as black">mark black</a>`;
                break;
            case blackState:
                actions = `<a class="mark_red" title="Mark the list as red">mark red</a>
                        <a class="mark_green" title="Mark the list as green">mark green</a>`;
                break;
        }

        html += `<div class="list_entry ${listState}" list_id="${list.id}" list_name="${list.name}">
            <span class="list_link">${list.name}</span>
            <span class="list_count">${list.cards.length}</span>
            <span class="list_date">${date}</span>
            <span class="list_actions">${actions}</span>  
            </div>`;
    }
    listMenuDiv.innerHTML = html;
    menuDiv.style.display = 'block';
    quizDiv.style.display = 'none';
    if (!noScroll) {
        window.scrollTo(0, 0);
    }
}

async function presentQuiz(list, randomize) {
    currentList = list;
    currentItemIdx = null;

    currentListLink.innerHTML = currentList.name;

    // sort cards into greenState and redState
    let greenCards = [];
    let redCards = [];
    let blackCards = [];
    for (let card of list.cards) {
        switch (card.state) {
            case greenState:
                greenCards.push(card);
                break;
            case redState:
                redCards.push(card);
                break;
            case blackState:
                blackCards.push(card);
                break;
        }
    }
    if (randomize) {
        shuffle(redCards);
        shuffle(blackCards);
        shuffle(greenCards);
    }
    list.cards = redCards.concat(greenCards, blackCards);
    let html = '';
    let i = 0;
    for (var card of list.cards) {
        let data = card.data;
        let classes = '';
        if (card.state === greenState) {
            classes += ' greenState';
        }
        if (card.state === redState) {
            classes += ' redState';
        }
        html += `<div class="kanji_item quiz_item hide_answer ${classes}" list_idx="${i}" card_uuid="${data.uuid}">
                    <div class="character">${data.character}</div>
                    <div class="answer">
                        <div class="meanings">${data.meanings.join(',&nbsp&nbsp')}</div>
                        <div class="onyomi"><span>${data.onyomi.join('</span><span>')}</span></div>
                        <div class="kunyomi"><span>${data.kunyomi.join('</span><span>')}</span></div>
                    </div>
                </div>`;
        i++;
    }
    quizItemsDiv.innerHTML = html;
    menuDiv.style.display = 'none';
    quizDiv.style.display = 'block';

    quizItemsDiv.style.marginTop = quizHeaderDiv.offsetHeight + 'px';

    if (list.cards.length > 0) {
        setCurrentItem(0);
    }
    window.scrollTo(0, 0);
}

async function reviewRed() {
    let cards = [];
    let lists = Object.values(allListsByID);
    for (let list of lists) {
        if (list.state === redState) {
            for (let card of list.cards) {
                if (card.state == redState) {
                    let copy = Object.assign({}, card);  // shallow
                    copy.state = blackState;
                    cards.push(copy);  
                }
            }
        }
    }
    currentList = {
        id: -1,
        name: `All red cards from all red lists (${cards.length})`,
        cards: cards
    };
    presentQuiz(currentList, true);
    
}

function getCurrentCard() {
    return currentList.cards[currentItemIdx];
}

function setCurrentItem(idx, scroll) {
    if (currentItemIdx !== idx) {
        var card = currentList.cards[idx];
    }
    if (currentItemIdx !== null) {
        let item = quizItemsDiv.children[currentItemIdx];
        if (item) {
            item.classList.remove('current');
        }
        currentItemIdx = null;
    }
    let item = quizItemsDiv.children[idx];
    if (item) {
        item.classList.add('current');
        if (scroll) {
            item.scrollIntoView({
                //behavior: "smooth", 
                block: "center"
            });
        }
        currentItemIdx = idx;
    }
}

// return true if advances past last item
function nextItem(n) {
    if (currentItemIdx === null) {
        return false;
    }
    if (currentItemIdx + n >= quizItemsDiv.children.length) {
        return true;
    }
    setCurrentItem(currentItemIdx + n, true);
    return false;
}

function prevItem(n) {
    if (currentItemIdx === null || currentItemIdx - n < 0) {
        return;
    }
    setCurrentItem(currentItemIdx - n, true);
}

quizItemsDiv.onclick = function (evt) {
    var ele = evt.target.closest('.quiz_item');
    if (!ele) {
        return;
    }
    ele.classList.remove('hide_answer');
    var idx = parseInt(ele.getAttribute('list_idx'));
    setCurrentItem(idx, false);
    evt.preventDefault();
};

quizItemsDiv.ondblclick = async function (evt) {
    var ele = evt.target.closest('.quiz_item');
    if (!ele) {
        return;
    }
    ele.classList.add('greenState');
    ele.classList.remove('redState');
    revealAnswer(ele);
    var card = getCurrentCard();
    await setCardState(greenState, [card], currentList);
    evt.preventDefault();
};

function revealAnswer(ele) {
    ele.classList.remove('hide_answer');
}

document.body.onload = async function () {
    await loadEverything();
    presentListMenu();
    console.log('loaded renderer');

    //await deleteAllLists();

    //await makeGroupedLists();
    // let unused = await getUnusedKanji();
    // console.log(unused.length, unused);
    // console.log('num kanji ', kanjiCards.length);
}

