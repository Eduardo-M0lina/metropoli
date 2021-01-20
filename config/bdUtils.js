
const mariadb = require('mariadb');
const dotenv = require("dotenv");
const logger = require("./loggerUtil");

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

const query = async function (sql) {
    logger.info("bdUtils --> query() --> sql:" + sql);
    let conn, rows;
    try {

        conn = await pool.getConnection();
        logger.info("bdUtils --> query() --> connection");
        rows = await conn.query(sql);
        logger.info("bdUtils --> query() --> connection execute SQL");
        //delete rows.meta;
        logger.info("bdUtils --> query() --> result: " + JSON.stringify(rows));
        return rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (conn) conn.end();
    }
}

const executeQuery = async function (sql) {
    logger.info("bdUtils --> executeQuery() --> sql:" + sql);
    let conn, res;
    try {
        conn = await pool.getConnection();
        logger.info("bdUtils --> executeQuery() --> connection");
        res = await conn.query(sql);
        logger.info("bdUtils --> executeQuery() --> connection execute SQL");
        console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
        logger.info("bdUtils --> executeQuery() --> result: " + JSON.stringify(res));
        return res;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (conn) conn.end();
    }
}


module.exports = {
    query,
    executeQuery
};