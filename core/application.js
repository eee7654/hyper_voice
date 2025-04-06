const dotenv = require('dotenv');
dotenv.config();

const app_host = process.env.APP_HOST;
const db_host = process.env.DB_HOST;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_name = process.env.NODE_ENV === 'production' ? process.env.DB_NAME : process.env.DB_NAME_DEV;
const db_port = process.env.DB_PORT;
const db_debug = process.env.NODE_ENV !== "production"

module.exports = {
    app_host,
    db_host,
    db_user,
    db_pass,
    db_name,
    db_port,
    db_debug
}