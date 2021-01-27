const logger = require("../config/loggerUtil");
const bdUtils = require("../config/bdUtils");
const sqlConstant = require("../config/sqlConstants");
const SQL = sqlConstant.SQL;

const create = async function (data) {
    logger.info("alertsHandler --> create()");
    var res = new Object();
    try {
        let alerts = await bdUtils.executeQuery(SQL.INSERT_ALERT
            .replace(":type", data.type)
            .replace(":item", data.item)
            .replace(":cycle", data.cycle)
            .replace(":day", data.day)
            .replace(":previous_days", data.previous_days)
            .replace(":month", data.month)
            .replace(":customer_id", data.customer_id)
        );
        logger.info("alertsHandler --> alerts:" + JSON.stringify(alerts));
        if (typeof alerts !== 'undefined') {
            res.status = true;
            res.message = "OK";
            res.data = data;
        } else {
            throw new Error("Error al crear alerta!");
        }
        return res;
    } catch (err) {
        logger.error("alertsHandler --> create() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const update = async function (data) {
    logger.info("alertsHandler --> update()");
    var res = new Object();
    try {
        let alerts = await bdUtils.executeQuery(SQL.UPDATE_ALERT
            .replace(":id", data.id)
            .replace(":cycle", data.cycle)
            .replace(":day", data.day)
            .replace(":previous_days", data.previous_days)
            .replace(":month", data.month)
            .replace(":status", data.status)
        );
        logger.info("alertsHandler --> alerts:" + JSON.stringify(alerts));
        if (typeof alerts !== 'undefined') {
            logger.info("alerts[0].affectedRows:" + alerts[0].affectedRows);
            if (alerts[0].affectedRows > 0) {
                res.status = true;
                res.message = "OK";
                res.data = data;
            } else {
                throw new Error("alerta no encontrada!");
            }
        } else {
            throw new Error("Error al actualizar alerta!");
        }
        return res;
    } catch (err) {
        logger.error("alertsHandler --> update() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const list = async function (data) {
    logger.info("alertsHandler --> list()");
    var res = new Object();
    try {
        let alerts = await bdUtils.query(SQL.LIST_ALERTS
            .replace(":customer_id", data.customer_id));
        if (typeof alerts !== 'undefined' && alerts.length >= 0) {
            res.status = true;
            res.message = "OK";
            res.data = alerts;
        }
        return res;
    } catch (err) {
        logger.error("alertsHandler --> list() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const listAll = async function (data) {
    logger.info("alertsHandler --> listAll()");
    var res = new Object();
    try {
        let alerts = await bdUtils.query(SQL.LIST_ALL_ALERTS);
        if (typeof alerts !== 'undefined' && alerts.length >= 0) {
            res.status = true;
            res.message = "OK";
            res.data = alerts;
        }
        return res;
    } catch (err) {
        logger.error("alertsHandler --> list() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const activeAlerts = async function (data) {
    logger.info("alertsHandler --> activeAlerts()");
    var res = new Object();
    try {
        let alerts = await bdUtils.query(SQL.ACTIVE_ALERTS
            .replace(/:customer_id/g, data.customer_id));
        if (typeof alerts !== 'undefined' && alerts.length >= 0) {
            res.status = true;
            res.message = "OK";
            res.data = alerts;
        }
        return res;
    } catch (err) {
        logger.error("alertsHandler --> activeAlerts() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

module.exports = {
    create,
    update,
    list,
    listAll,
    activeAlerts
};