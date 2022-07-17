const db = require('knex')({
    client: 'sqlite3',
    useNullAsDefault: false,
    connection: {
        filename: "./data/data.sqlite"
    }
});

console.log("Reseting all list and card color state to black");

const greenState = 1;
const redState = 0;
const blackState = 2;

db('card_by_list').where({state: redState}).update({ state: blackState }).then (
    (val) => {
        return db('card_by_list').where({state: greenState}).update({ state: blackState });
    }
).then(
    (val) => {
        return db('list').update({ state: blackState });
    }
).then(
    (val) => {
        console.log('done');
        process.exit(1);
    }
);



