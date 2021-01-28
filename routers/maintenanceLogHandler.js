const logger = require("../config/loggerUtil");
const bdUtils = require("../config/bdUtils");
const sqlConstant = require("../config/sqlConstants");
const SQL = sqlConstant.SQL;

const create = async function (data) {
    logger.info("maintenanceLogHandler --> create()");
    var res = new Object();
    try {
        let maintenanceLog = await bdUtils.executeQuery(SQL.INSERT_MAINTENANCE_LOG
            .replace(":inventory_id", data.inventory_id)
            .replace(":title", data.title)
            .replace(":description", data.description)
            .replace(":observation", data.observation)
            .replace(":date", data.date)
            .replace(":customer_id", data.customer_id)
        );
        logger.info("maintenanceLogHandler --> maintenanceLog:" + JSON.stringify(maintenanceLog));
        if (typeof maintenanceLog !== 'undefined') {
            res.status = true;
            res.message = "OK";
            res.data = data;
        } else {
            throw new Error("Error al crear cliente!");
        }
        return res;
    } catch (err) {
        logger.error("maintenanceLogHandler --> create() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const update = async function (data) {
    logger.info("maintenanceLogHandler --> update()");
    var res = new Object();
    try {
        let maintenanceLog = await bdUtils.executeQuery(SQL.UPDATE_MAINTENANCE_LOG
            .replace(":id", data.id)
            .replace(":inventory_id", data.inventory_id)
            .replace(":title", data.title)
            .replace(":description", data.description)
            .replace(":observation", data.observation)
            .replace(":date", data.date)
        );
        logger.info("maintenanceLogHandler --> maintenanceLog:" + JSON.stringify(maintenanceLog));
        if (typeof maintenanceLog !== 'undefined') {
            logger.info("maintenanceLog[0].affectedRows:" + maintenanceLog[0].affectedRows);
            if (maintenanceLog[0].affectedRows > 0) {
                res.status = true;
                res.message = "OK";
                res.data = data;
            } else {
                throw new Error("Funcionario no encontrado!");
            }
        } else {
            throw new Error("Error al actualizar funcionario!");
        }
        return res;
    } catch (err) {
        logger.error("maintenanceLogHandler --> update() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const list = async function (data) {
    logger.info("maintenanceLogHandler --> list()");
    var res = new Object();
    try {
        let maintenanceLog = await bdUtils.query(SQL.LIST_MAINTENANCE_LOGS
            .replace(":customer_id", data.customer_id));
        if (typeof maintenanceLog !== 'undefined' && maintenanceLog.length >= 0) {
            res.status = true;
            res.message = "OK";
            res.data = maintenanceLog;
        }
        return res;
    } catch (err) {
        logger.error("maintenanceLogHandler --> list() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

module.exports = {
    create,
    update,
    list
};