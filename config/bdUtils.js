
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

const searchOne = async function (sql) {
    return sql;
}

const query = async function (sql) {
    logger.info("bdUtils --> query()");
    logger.info("bdUtils --> query() --> sql:" + sql);
    let conn, rows, result;
    try {

        conn = await pool.getConnection();
        logger.info("bdUtils --> query() --> connection");
        rows = await conn.query(sql);
        logger.info("bdUtils --> query() --> connection execute SQL");
        //delete rows.meta;
        //console.log(rows);
        //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
        logger.info("bdUtils --> query() --> result: " + JSON.stringify(rows));
        return rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (conn) conn.end();
    }
}


module.exports = {
    query,
    searchOne
};