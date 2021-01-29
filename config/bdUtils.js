
const mysql = require('mysql2');
const dotenv = require("dotenv");
const logger = require("./loggerUtil");

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});

const query = async function (sql) {
    //logger.info("bdUtils --> query() --> sql:" + sql);
    try {
        const promisePool = pool.promise();
        const [rows] = await promisePool.query(sql);
        //logger.info("bdUtils --> query() --> result: " + JSON.stringify(rows));
        rows.forEach(data => {
            Object.keys(data).forEach((key) => {
                if (data[key] === null || data[key] === '' || data[key] === undefined || data[key] === 'undefined' || data[key] === 'null' ) {
                    delete data[key];
                }
            });
        })
        //logger.info("bdUtils --> query() --> result: " + JSON.stringify(rows));
        return rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const executeQuery = async function (sql) {
    //logger.info("bdUtils --> executeQuery() --> sql:" + sql);
    try {
        const promisePool = pool.promise();
        const res = await promisePool.query(sql);
        //logger.info("bdUtils --> executeQuery() --> result: " + JSON.stringify(res));
        return res;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    query,
    executeQuery
};