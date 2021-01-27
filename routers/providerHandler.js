const logger = require("../config/loggerUtil");
const bdUtils = require("../config/bdUtils");
const sqlConstant = require("../config/sqlConstants");
const SQL = sqlConstant.SQL;

const create = async function (data) {
    logger.info("providerHandler --> create()");
    var res = new Object();
    try {
        let provider = await bdUtils.executeQuery(SQL.INSERT_PROVIDER
            .replace(":name", data.name)
            .replace(":customer_id", data.customer_id)
        );
        logger.info("providerHandler --> provider:" + JSON.stringify(provider));
        if (typeof provider !== 'undefined') {
            res.status = true;
            res.message = "OK";
            res.data = data;
        } else {
            throw new Error("Error al crear cliente!");
        }
        return res;
    } catch (err) {
        logger.error("providerHandler --> create() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const update = async function (data) {
    logger.info("providerHandler --> update()");
    var res = new Object();
    try {
        let provider = await bdUtils.executeQuery(SQL.UPDATE_PROVIDER
            .replace(":id", data.id)
            .replace(":name", data.name)
            .replace(":status", data.status)
        );
        logger.info("providerHandler --> provider:" + JSON.stringify(provider));
        if (typeof provider !== 'undefined') {
            logger.info("provider[0].affectedRows:" + provider[0].affectedRows);
            if (provider[0].affectedRows > 0) {
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
        logger.error("providerHandler --> update() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const list = async function (data) {
    logger.info("providerHandler --> list()");
    var res = new Object();
    try {
        let provider = await bdUtils.query(SQL.LIST_PROVIDERS
            .replace(":customer_id", data.customer_id));
        if (typeof provider !== 'undefined' && provider.length >= 0) {
            res.status = true;
            res.message = "OK";
            res.data = provider;
        }
        return res;
    } catch (err) {
        logger.error("providerHandler --> list() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

module.exports = {
    create,
    update,
    list
};