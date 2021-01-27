const logger = require("../config/loggerUtil");
const bdUtils = require("../config/bdUtils");
const sqlConstant = require("../config/sqlConstants");
const SQL = sqlConstant.SQL;

const create = async function (data) {
    logger.info("zoneHandler --> create()");
    var res = new Object();
    try {
        let zone = await bdUtils.executeQuery(SQL.INSERT_ZONE
            .replace(":name", data.name)
            .replace(":customer_id", data.customer_id)
        );
        logger.info("zoneHandler --> zone:" + JSON.stringify(zone));
        if (typeof zone !== 'undefined') {
            res.status = true;
            res.message = "OK";
            res.data = data;
        } else {
            throw new Error("Error al crear cliente!");
        }
        return res;
    } catch (err) {
        logger.error("zoneHandler --> create() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const update = async function (data) {
    logger.info("zoneHandler --> update()");
    var res = new Object();
    try {
        let zone = await bdUtils.executeQuery(SQL.UPDATE_ZONE
            .replace(":id", data.id)
            .replace(":name", data.name)
            .replace(":status", data.status)
        );
        logger.info("zoneHandler --> zone:" + JSON.stringify(zone));
        if (typeof zone !== 'undefined') {
            logger.info("zone[0].affectedRows:" + zone[0].affectedRows);
            if (zone[0].affectedRows > 0) {
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
        logger.error("zoneHandler --> update() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const list = async function (data) {
    logger.info("zoneHandler --> list()");
    var res = new Object();
    try {
        let zone = await bdUtils.query(SQL.LIST_ZONES
            .replace(":customer_id", data.customer_id));
        if (typeof zone !== 'undefined' && zone.length >= 0) {
            res.status = true;
            res.message = "OK";
            res.data = zone;
        }
        return res;
    } catch (err) {
        logger.error("zoneHandler --> list() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

module.exports = {
    create,
    update,
    list
};