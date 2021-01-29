const logger = require("../config/loggerUtil");
const bdUtils = require("../config/bdUtils");
const sqlConstant = require("../config/sqlConstants");
const SQL = sqlConstant.SQL;

const create = async function (data) {
    logger.info("paymentsHandler --> create()");
    var res = new Object();
    try {
        let payments = await bdUtils.executeQuery(SQL.INSERT_PAYMENT
            .replace(":obligation_id", data.obligation_id)
            .replace(":value", data.value)
            .replace(":date", data.date)
            .replace(":customer_id", data.customer_id)
        );
        logger.info("paymentsHandler --> payments:" + JSON.stringify(payments));
        if (typeof payments !== 'undefined') {
            res.status = true;
            res.message = "OK";
            res.data = data;
        } else {
            throw new Error("Error al crear cliente!");
        }
        return res;
    } catch (err) {
        logger.error("paymentsHandler --> create() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const update = async function (data) {
    logger.info("paymentsHandler --> update()");
    var res = new Object();
    try {
        let payments = await bdUtils.executeQuery(SQL.UPDATE_PAYMENT
            .replace(":id", data.id)
            .replace(":obligation_id", data.obligation_id)
            .replace(":value", data.value)
            .replace(":date", data.date)
        );
        logger.info("paymentsHandler --> payments:" + JSON.stringify(payments));
        if (typeof payments !== 'undefined') {
            logger.info("payments[0].affectedRows:" + payments[0].affectedRows);
            if (payments[0].affectedRows > 0) {
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
        logger.error("paymentsHandler --> update() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const list = async function (data) {
    logger.info("paymentsHandler --> list()");
    var res = new Object();
    try {
        let payments = await bdUtils.query(SQL.LIST_PAYMENTS
            .replace(":customer_id", data.customer_id));
        if (typeof payments !== 'undefined' && payments.length >= 0) {
            res.status = true;
            res.message = "OK";
            res.data = payments;
        }
        return res;
    } catch (err) {
        logger.error("paymentsHandler --> list() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

module.exports = {
    create,
    update,
    list
};