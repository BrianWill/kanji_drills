const { shell } = require("electron");

var menuDiv = document.getElementById('menu');
var listMenuDiv = document.getElementById('list_menu');
var listsDiv = document.getElementById('lists');
var quizDiv = document.getElementById('quiz');
var quizHeaderDiv = document.getElementById('quiz_header');
var quizItemsDiv = document.getElementById('quiz_items');
var currentListLink = document.getElementById('current_list_link');
var cardActions = document.getElementById('card_actions');
// var togglePairsLink = document.getElementById('pair_toggle_link');

var currentItemIdx = null;
var currentList = null;
var showPairs = false;

var listsOrdered = null;

const topSortCount = 2;

document.body.onkeydown = async function (evt) {
    //console.log(evt.key);
    if (currentList) {
        var ele = quizItemsDiv.children[currentItemIdx];
        var card = getCurrentCard();
        if (evt.code === 'KeyS') {
            evt.preventDefault();
            revealAnswer(ele);
        } else if (evt.key === 'Escape') {
            evt.preventDefault();
            presentListMenu();
        } else if (evt.key === 'PageUp') {
            evt.preventDefault();
            let list = prevList();
            if (list) {
                presentQuiz(list, true);
            }
        } else if (evt.key === 'PageDown') {
            evt.preventDefault();
            let list = nextList();
            if (list) {
                presentQuiz(list, true);
            }
        } else if ((evt.key === 'ArrowLeft' && evt.altKey) || evt.key === 'Home') {
            evt.preventDefault();
            setCurrentItem(0, true);
        } else if ((evt.key === 'ArrowRight' && evt.altKey) || evt.key === 'End') {
            evt.preventDefault();
            setCurrentItem(quizItemsDiv.children.length - 1, true);
        } else if (evt.code === 'KeyG') {
            evt.preventDefault();
            await toggleCardMarking(card.data.uuid);
            ele.classList.toggle('marked');
        } else if (evt.code === 'KeyW') {
            evt.preventDefault();
            await toggleCardAnswered(card, ele);
        } else if (evt.key === 'ArrowRight') {
            evt.preventDefault();
            ele.classList.add('greenState');
            ele.classList.remove('redState');
            revealAnswer(ele);
            await setCardState(greenState, [card], currentList);
        } else if (evt.key === 'ArrowLeft') {
            evt.preventDefault();
            ele.classList.remove('greenState');
            revealAnswer(ele);
            await setCardState(blackState, [card], currentList);
        } else if (evt.key === 'ArrowDown' || evt.code === 'KeyX') {
            evt.preventDefault();
            nextItem(evt.altKey ? 4 : 1);
        } else if (evt.key === 'ArrowUp' || evt.code === 'KeyZ') {
            evt.preventDefault();
            prevItem(evt.altKey ? 4 : 1);
        } else if ((evt.code === 'KeyR') && evt.altKey) {
            let cards = currentList.cards;
            await setCardState(blackState, cards, currentList);
            presentQuiz(currentList, false);
        } else if (evt.code === 'KeyL' && evt.altKey) {
            evt.preventDefault();
            console.log(card);
            shell.openExternal('https://www.wanikani.com/kanji/' + card.data.character);
            shell.openExternal('https://jisho.org/search/' + card.data.character);
        } else if ((evt.key === 'Enter' && evt.altKey) || evt.code === 'KeyA') {
            evt.preventDefault();
            presentQuiz(currentList, true, topSortCount);
        } else if (evt.code === 'KeyD') {
            evt.preventDefault();
            if (card.state !== blackState) {
                return;
            }
            await setCardState(greenState, [card], currentList);
            presentQuiz(currentList, true, topSortCount);
        }
    } else {
        if ((evt.key === 'ArrowLeft' && evt.altKey) || evt.key === 'Home') {
            evt.preventDefault();
            window.scrollTo(0, 0);
        } else if ((evt.key === 'ArrowRight' && evt.altKey) || evt.key === 'End') {
            evt.preventDefault();
            window.scrollTo(0, document.body.scrollHeight);
        }
    }
};

listMenuDiv.onmousedown = async function (evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('review_red_marked')) {
        review(redState, true);
    } else if (evt.target.classList.contains('review_blue_marked')) {
        review(blueState, true);
    } else if (evt.target.classList.contains('review_yellow_marked')) {
        review(yellowState, true);
    } else if (evt.target.classList.contains('review_red')) {
        review(redState);
    } else if (evt.target.classList.contains('review_blue')) {
        review(blueState);
    } else if (evt.target.classList.contains('review_yellow')) {
        review(yellowState);
    }
}

listsDiv.onmousedown = async function (evt) {
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
    } else if (c.contains('mark_white')) {
        setListState(list, whiteState, listEle);
        presentListMenu(true);
    } else if (c.contains('mark_yellow')) {
        setListState(list, yellowState, listEle);
        presentListMenu(true);
    } else if (c.contains('mark_blue')) {
        setListState(list, blueState, listEle);
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
    } else if (c.contains('reveal_answers')) {
        for (let ele of quizItemsDiv.children) {
            revealAnswer(ele);
        }
    } else if (c.contains('toggle_pairs')) {
        showPairs = !showPairs;
        togglePairsLink.innerText = showPairs ? 'hide pairs' : 'show pairs';
        presentQuiz(currentList, false);
    }
};

function countMarked(cardUUIDs) {
    let n = 0;
    for (let cardUUID of cardUUIDs) {
        if (cardDataByUUID[cardUUID].marking === greenState) {
            n++;
        }
    }
    return n;
}

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
    let blue = [];
    let white = [];
    let yellow = [];

    // used for count of unique cards across the colors of list
    let redCards = new Set();
    let greenCards = new Set();
    let yellowCards = new Set();
    let blueCards = new Set();
    let whiteCards = new Set();
    let blackCards = new Set();

    function addCardsToSet(list, set) {
        for (let card of list.cards) {
            set.add(card.data.uuid);
        }
    }

    for (let list of lists) {
        switch (list.state) {
            case redState:
                red.push(list);
                addCardsToSet(list, redCards);
                break;
            case blueState:
                blue.push(list);
                addCardsToSet(list, blueCards);
                break;
            case blackState:
                black.push(list);
                addCardsToSet(list, blackCards);
                break;
            case yellowState:
                yellow.push(list);
                addCardsToSet(list, yellowCards);
                break;
            case whiteState:
                white.push(list);
                addCardsToSet(list, whiteCards);
                break;
            case greenState:
                green.push(list);
                addCardsToSet(list, greenCards);
                break;
        }
    }



    blue.sort(function (a, b) {
        return b.last_marked - a.last_marked;
    });

    red.sort(function (a, b) {
        return b.last_marked - a.last_marked;
    });

    yellow.sort(function (a, b) {
        return b.last_marked - a.last_marked;
    });

    green.sort(function (a, b) {
        return b.last_marked - a.last_marked;
    });

    white.sort(function (a, b) {
        return b.last_marked - a.last_marked;
    });

    let totalCards = new Set([...redCards, ...greenCards, ...yellowCards, ...blueCards, ...whiteCards]);
    let allCards = new Set([...totalCards, ...blackCards]);

    lists = red.concat(blue, yellow, green, white, black);

    let seenCount = red.length + blue.length + yellow.length + green.length + white.length;

    let nRedMarked = countMarked(redCards);
    let nBlueMarked = countMarked(blueCards);
    let nYellowMarked = countMarked(yellowCards);
    let nGreenMarked = countMarked(greenCards);
    let nWhiteMarked = countMarked(whiteCards);
    let nTotalMarked = nRedMarked + nBlueMarked + nGreenMarked + nWhiteMarked;

    var html = `<table id="card_count">
            <tr><td>Red lists: ${red.length}</td><td>Kanji: ${redCards.size}</td><td>Marked: ${nRedMarked}</td></tr>
            <tr><td>Blue lists: ${blue.length}</td><td>Kanji: ${blueCards.size}</td><td>Marked: ${nBlueMarked}</td></tr>
            <tr><td>Yellow lists: ${yellow.length}</td><td>Kanji: ${yellowCards.size}</td><td>Marked: ${nYellowMarked}</td></tr>
            <tr><td>Green lists: ${green.length}</td><td>Kanji: ${greenCards.size}</td><td>Marked: ${nGreenMarked}</td></tr>
            <tr><td>White lists: ${white.length}</td><td>Kanji: ${whiteCards.size}</td><td>Marked: ${nWhiteMarked}</td></tr>
            <tr><td>Total: ${seenCount} of ${lists.length}</td><td>Kanji: ${totalCards.size} of ${allCards.size}</td><td>Marked: ${nTotalMarked}</td></tr>
            </table>`;
    for (var list of lists) {
        let listState = stateClass[list.state];
        let date = '';
        if (list.state !== blackState) {
            date = unixtimeToDate(list.last_marked).toLocaleDateString('en-us', {
                year: "numeric", month: "short", day: "numeric"
            });
            // "Friday, Jul 2, 2021"
        }
        let actions = '';
        if (list.state !== redState) {
            actions += `<a class="mark_red" title="Mark the list as red">mark red</a>`;
        }
        if (list.state !== blueState) {
            actions += `<a class="mark_blue" title="Mark the list as blue">mark blue</a>`;
        }
        if (list.state !== yellowState) {
            actions += `<a class="mark_yellow" title="Mark the list as yellow">mark yellow</a>`;
        }
        if (list.state !== greenState) {
            actions += `<a class="mark_green" title="Mark the list as green">mark green</a>`;
        }
        if (list.state !== whiteState) {
            actions += `<a class="mark_white" title="Mark the list as white">mark white</a>`;
        }
        if (list.state !== blackState) {
            actions += `<a class="mark_black" title="Mark the list as black">mark black</a>`;
        }
        html += `<div class="list_entry ${listState}" list_id="${list.id}" list_name="${list.name}">
                    <span class="list_link">${list.name}</span>
                    <span class="list_count">${list.cards.length}</span>
                    <span class="list_date">${date}</span>
                    <span class="list_actions">${actions}</span>  
            </div>`;
    }
    listsOrdered = lists;
    listsDiv.innerHTML = html;
    menuDiv.style.display = 'block';
    quizDiv.style.display = 'none';
    if (!noScroll) {
        window.scrollTo(0, 0);
    }
}

function nextList() {
    if (!currentList) {
        return null;
    }
    let idx = 0;
    for (let list of listsOrdered) {
        if (list === currentList) {
            break;
        }
        idx++;
    }
    idx++;
    if (idx >= listsOrdered.length) {
        return null;
    }
    return listsOrdered[idx];
}

function prevList() {
    if (!currentList) {
        return null;
    }
    let idx = 0;
    for (let list of listsOrdered) {
        if (list === currentList) {
            break;
        }
        idx++;
    }
    idx--;
    if (idx < 0) {
        return null;
    }
    return listsOrdered[idx];
}

async function presentQuiz(list, randomize, nCardsWorkingSet) {
    currentList = list;
    currentItemIdx = null;

    currentListLink.innerHTML = `<span class="${stateClass[list.state]}">${currentList.name}</span>`;

    // sort cards into greenState and redState
    let greenCards = [];
    let unmarkedBlackCards = [];
    let markedBlackCards = [];
    for (let card of list.cards) {
        switch (card.state) {
            case greenState:
                greenCards.push(card);
                break;
            case blackState:
                if (card.data.marking === marked) {
                    markedBlackCards.push(card);
                } else {
                    unmarkedBlackCards.push(card);
                }
                break;
        }
    }
    if (randomize) {
        nCardsWorkingSet = nCardsWorkingSet || 0;

        if (markedBlackCards.length > 0) {
            let firstN = markedBlackCards.slice(0, nCardsWorkingSet);
            let rest = markedBlackCards.slice(nCardsWorkingSet);
            shuffle(firstN, true);
            shuffle(rest);
            markedBlackCards = firstN.concat(rest);
            shuffle(unmarkedBlackCards);
        } else {
            let firstN = unmarkedBlackCards.slice(0, nCardsWorkingSet);
            let rest = unmarkedBlackCards.slice(nCardsWorkingSet);
            shuffle(firstN, true);
            shuffle(rest);
            unmarkedBlackCards = firstN.concat(rest);
        }

        shuffle(greenCards);
    }
    list.cards = markedBlackCards.concat(unmarkedBlackCards, greenCards);
    let html = '';
    let i = 0;
    for (var card of list.cards) {
        let data = card.data;
        let classes = '';
        if (card.state === greenState) {
            classes += ' greenState';
        }
        if (card.data.marking) {
            classes += ' marked';
        }
        let pair = '';
        if (card.pair && showPairs) {
            let pairData = cardDataByUUID[card.pair];
            pair = `<div class="pair character_container">
                        <div class="character">${pairData.character}</div>
                        <div class="answer">
                            <div class="meanings">${pairData.meanings.join(',&nbsp&nbsp')} <span class="frequency">${pairData.frequency || 'rare'}</span></div>
                            <div class="onyomi"><span>${pairData.onyomi.join('</span><span>')}</span></div>
                            <div class="kunyomi"><span class="term">${pairData.kunyomi.join('</span><span class="term">')}</span></div>
                        </div>
                    </div>`;
        }

        html += `<div class="kanji_item quiz_item hide_answer ${classes}" list_idx="${i}" card_uuid="${data.uuid}">
                    <div class="character_container">
                        <div class="character">${data.character}</div>
                        <div class="answer">
                            <div class="meanings">${data.meanings.join(',&nbsp&nbsp')} <span class="frequency">${data.frequency || 'rare'}</span></div>
                            <div class="onyomi"><span>${data.onyomi.join('</span><span>')}</span></div>
                            <div class="kunyomi"><span class="term">${data.kunyomi.join('</span><span class="term">')}</div>
                        </div>
                    </div>
                    ${pair}
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

async function review(colorState, marked) {
    let cards = [];
    let cardSet = new Set();
    let lists = Object.values(allListsByID);
    for (let list of lists) {
        if (list.state === colorState) {
            for (let card of list.cards) {
                if ((!marked || card.data.marking == 1) && !cardSet.has(card.data.uuid)) {
                    let copy = Object.assign({}, card);  // shallow
                    copy.state = blackState;
                    cards.push(copy);
                    cardSet.add(card.data.uuid);
                }
            }
        }
    }
    let color = stateClass[colorState];
    currentList = {
        id: -1,
        name: `All ${marked ? 'marked' : ''} kanji from all 
            <span class="${color}">${color}</span> lists (${cards.length})`,
        cards: cards
    };
    presentQuiz(currentList, true);
}

function getCurrentCard() {
    return currentList.cards[currentItemIdx];
}

async function setMeanings() {
    let card = getCurrentCard();
    card.data.meanings = new Array(...arguments)
    console.log(card.data.meanings);
    await updateCardData(card);
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
    if (evt.target.classList.contains('term')) {
        let kanji = evt.target.closest('.character_container').querySelector('.character').innerText.trim();
        let word = evt.target.innerText.trim().replace('.', '');
        console.log(kanji, word);
        shell.openExternal(`https://jisho.org/search/${word} ${kanji}`);
    }
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

function hideAnswer(ele) {
    ele.classList.add('hide_answer');
}

async function toggleCardAnswered(card, ele) {
    if (card.state === blackState) {
        ele.classList.add('greenState');
        ele.classList.remove('redState');
        revealAnswer(ele);
        await setCardState(greenState, [card], currentList);
    } else {
        ele.classList.remove('greenState');
        hideAnswer(ele);
        await setCardState(blackState, [card], currentList);
    }
}

document.body.onload = async function () {
    await loadEverything();

    //await deleteAllLists();

    //await makeGroupedLists();
    //await loadEverything();

    presentListMenu();
    console.log('loaded');

    // let unused = await getUnusedKanji();
    // console.log(unused.length, unused);
    // console.log('num kanji ', kanjiCards.length);
}

