const dotenv = require('dotenv');
dotenv.config();

const env = process.env;

module.exports = {
    db: {
        host: env.DB_HOST,
        port: env.DB_PORT,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
        pool: {
            max: 25,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    listPerPage: env.LIST_PER_PAGE,
};