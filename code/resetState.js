const db = require('knex')({
    client: 'sqlite3',
    useNullAsDefault: false,
    connection: {
        filename: "./data/data.sqlite"
    }
});

console.log("Reseting all list and card color state to black");

const blackState = 2;

db('list').update({ state:  blackState }).then(
    (val) => {
        db('card_by_list').update({ state: blackState });
    }
);
