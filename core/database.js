const knex = require('knex')
const knexConfig = require('../knexfile.js');

var dbpool
const db = ()=>{
    if (dbpool == undefined) {
        dbpool = knex(knexConfig[process.env.NODE_ENV])
    }
    return dbpool
}

module.exports = db