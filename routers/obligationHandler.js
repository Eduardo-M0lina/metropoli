const logger = require("../config/loggerUtil");
const bdUtils = require("../config/bdUtils");
const sqlConstant = require("../config/sqlConstants");
const SQL = sqlConstant.SQL;

const create = async function (data) {
    logger.info("obligationsHandler --> create()");
    var res = new Object();
    try {
        let obligations = await bdUtils.executeQuery(SQL.INSERT_OBLIGATION
            .replace(":reference", data.reference)
            .replace(":description", data.description)
            .replace(":customer_id", data.customer_id)
        );
        logger.info("obligationsHandler --> obligations:" + JSON.stringify(obligations));
        if (typeof obligations !== 'undefined') {
            res.status = true;
            res.message = "OK";
            res.data = data;
        } else {
            throw new Error("Error al crear solicitud obligations!");
        }
        return res;
    } catch (err) {
        logger.error("obligationsHandler --> create() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const update = async function (data) {
    logger.info("obligationsHandler --> update()");
    var res = new Object();
    try {
        let obligations = await bdUtils.executeQuery(SQL.UPDATE_OBLIGATION
            .replace(":id", data.id)
            .replace(":reference", data.reference)
            .replace(":description", data.description)
            .replace(":status", data.status)
            .replace(":customer_id", data.customer_id)
        );
        logger.info("obligationsHandler --> obligations:" + JSON.stringify(obligations));
        if (typeof obligations !== 'undefined') {
            logger.info("obligations[0].affectedRows:" + obligations[0].affectedRows);
            if (obligations[0].affectedRows > 0) {
                res.status = true;
                res.message = "OK";
                res.data = data;
            } else {
                throw new Error("solicitud obligations no encontrado!");
            }
        } else {
            throw new Error("Error al actualizar solicitud obligations!");
        }
        return res;
    } catch (err) {
        logger.error("obligationsHandler --> update() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const list = async function (data) {
    logger.info("obligationsHandler --> list()");
    var res = new Object();
    try {
        let obligations = await bdUtils.query(SQL.LIST_OBLIGATIONS
            .replace(":customer_id", data.customer_id));
        if (typeof obligations !== 'undefined' && obligations.length >= 0) {
            res.status = true;
            res.message = "OK";
            res.data = obligations;
        }
        return res;
    } catch (err) {
        logger.error("obligationsHandler --> list() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const listAll = async function (data) {
    logger.info("obligationsHandler --> listAll()");
    var res = new Object();
    try {
        let obligations = await bdUtils.query(SQL.LIST_ALL_OBLIGATIONS);
        if (typeof obligations !== 'undefined' && obligations.length >= 0) {
            res.status = true;
            res.message = "OK";
            res.data = obligations;
        }
        return res;
    } catch (err) {
        logger.error("obligationsHandler --> list() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

module.exports = {
    create,
    update,
    list,
    listAll
};