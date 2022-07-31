function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    if (array.length < 2) {
        return array;
    }

    let first = array[0];

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] =
            [array[randomIndex], array[currentIndex]];
    }

    // if original first element is still first, swap it with last element
    if (array[0] === first) {
        array[0] = array[array.length - 1];
        array[array.length - 1] = first;
    }

    return array;
}

function unixtime() {
    return Math.floor(Date.now() / 1000);
}

function unixtimeToDate(unixtime) {
    return new Date(unixtime * 1000);
}

