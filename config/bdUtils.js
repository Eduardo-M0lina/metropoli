
const mysql = require('mysql2');
const dotenv = require("dotenv");
const logger = require("./loggerUtil");

dotenv.config();

/*const pool = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});*/

const pool = mysql.createPool({ 
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PWD,
    database: process.env.DB_NAME 
});

const query = async function (sql) {
    logger.info("bdUtils --> pool:" + pool);
    logger.info("bdUtils --> query() --> sql:" + sql);
    try {
        const promisePool = pool.promise();
        logger.info("bdUtils --> query() --> connection");
        const [rows] = await promisePool.query(sql);
        logger.info("bdUtils --> query() --> connection execute SQL");
        logger.info("bdUtils --> query() --> result: " + JSON.stringify(rows));
        /*conn = await pool.connect();
        logger.info("bdUtils --> query() --> connection");
        rows = await conn.query(sql);
        logger.info("bdUtils --> query() --> connection execute SQL");
        //delete rows.meta;
        logger.info("bdUtils --> query() --> result: " + JSON.stringify(rows));*/
        return rows;
    } catch (err) {
        console.log(err);
        throw err;
    } 
}

const executeQuery = async function (sql) {
    logger.info("bdUtils --> pool:" + pool);
    logger.info("bdUtils --> executeQuery() --> sql:" + sql);
    try {
        const promisePool = pool.promise();
        logger.info("bdUtils --> executeQuery() --> connection");
        const res = await promisePool.query(sql);
        logger.info("bdUtils --> executeQuery() --> connection execute SQL");
        logger.info("bdUtils --> executeQuery() --> result: " + JSON.stringify(res));
        /*conn = await pool.connect();
        logger.info("bdUtils --> executeQuery() --> connection");
        res = await conn.query(sql);
        logger.info("bdUtils --> executeQuery() --> connection execute SQL");
        console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
        logger.info("bdUtils --> executeQuery() --> result: " + JSON.stringify(res));*/
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