const CryptoJS = require("crypto-js");
const logger = require("../config/loggerUtil");
const bdUtils = require("../config/bdUtils");
const sqlConstant = require("../config/sqlConstants");
const SQL = sqlConstant.SQL;


const create = async function (data) {
    logger.info("inventoryHandler --> create()");
    var res = new Object();
    try {
        let inventory = await bdUtils.executeQuery(SQL.INSERT_INVENTORY
            .replace(":name", data.name)
            .replace(":description", data.description)
            .replace(":location", data.location)
            .replace(":zone", data.zone)
            .replace(":provider", data.provider)
            .replace(":buy_date", data.buy_date)
            .replace(":value", data.value)
            .replace(":observation", data.observation)
            .replace(":customer_id", data.customer_id)
        );
        logger.info("inventoryHandler --> inventory:" + JSON.stringify(inventory));
        if (typeof inventory !== 'undefined') {
            res.status = true;
            res.message = "OK";
            delete data.password;
            res.data = data;
        } else {
            throw new Error("Error al crear item!");
        }
        return res;
    } catch (err) {
        logger.error("inventoryHandler --> create() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const update = async function (data) {
    logger.info("inventoryHandler --> update()");
    var res = new Object();
    try {
        let inventory = await bdUtils.executeQuery(SQL.UPDATE_INVENTORY
            .replace(":id", data.id)
            .replace(":name", data.name)
            .replace(":description", data.description)
            .replace(":location", data.location)
            .replace(":zone", data.zone)
            .replace(":provider", data.provider)
            .replace(":buy_date", data.buy_date)
            .replace(":value", data.value)
            .replace(":observation", data.observation)
            .replace(":status", data.status)
        );
        logger.info("inventoryHandler --> inventory:" + JSON.stringify(inventory));
        if (typeof inventory !== 'undefined') {
            if (inventory[0].affectedRows > 0) {
                res.status = true;
                res.message = "OK";
                res.data = data;
            } else {
                res.status = false;
                throw new Error("Item no encontrado!");
            }
        } else {
            throw new Error("Error al actualizar item!");
        }
        return res;
    } catch (err) {
        logger.error("inventoryHandler --> update() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}


const list = async function (data) {
    logger.info("inventoryHandler --> list()");
    var res = new Object();
    try {
        let inventory = await bdUtils.query(SQL.LIST_INVENTORY
            .replace(":customer_id", data.customer_id));
        if (typeof inventory !== 'undefined' && inventory.length >= 0) {
            for await (let element of inventory) {
                let scheduling_alerts = await bdUtils.query(SQL.GET_ALERT
                    .replace(":type", 1)
                    .replace(":item", element.id)
                    .replace(":customer_id", element.customer_id));
                if (typeof scheduling_alerts !== 'undefined' && scheduling_alerts.length >= 0) {
                    element.scheduling_alerts = scheduling_alerts[0];
                }
            }
            res.status = true;
            res.message = "OK";
            res.data = inventory;
        }
        return res;
    } catch (err) {
        logger.error("inventoryHandler --> list() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const listAll = async function () {
    logger.info("inventoryHandler --> listAll()");
    var res = new Object();
    try {
        let inventory = await bdUtils.query(SQL.LIST_ALL_INVENTORY);
        if (typeof inventory !== 'undefined' && inventory.length >= 0) {
            res.status = true;
            res.message = "OK";
            res.data = inventory;
        }
        return res;
    } catch (err) {
        logger.error("inventoryHandler --> list() --> Error!");
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