const logger = require("../config/loggerUtil");
const bdUtils = require("../config/bdUtils");
const sqlConstant = require("../config/sqlConstants");
const SQL = sqlConstant.SQL;

const create = async function (data) {
    logger.info("customerHandler --> create()");
    var res = new Object();
    try {
        let customer = await bdUtils.executeQuery(SQL.INSERT_CUSTOMER
            .replace(":document", data.document)
            .replace(":document_type", data.document_type)
            .replace(":business_name", data.business_name)
            .replace(":department", data.department)
            .replace(":municipality", data.municipality)
            .replace(":neighborhood", data.neighborhood)
            .replace(":address", data.address)
            .replace(":complement_address", data.complement_address)
            .replace(":phone1", data.phone1)
            .replace(":phone2", data.phone2)
            .replace(":email", data.email)
        );
        logger.info("customerHandler --> customer:" + JSON.stringify(customer));
        if (typeof customer !== 'undefined') {
            res.status = true;
            res.message = "OK";
            res.data = data;
        } else {
            throw new Error("Error al crear cliente!");
        }
        return res;
    } catch (err) {
        logger.error("customerHandler --> create() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const update = async function (data) {
    logger.info("customerHandler --> update()");
    var res = new Object();
    try {
        let customer = await bdUtils.executeQuery(SQL.UPDATE_CUSTOMER
            .replace(":id", data.id)
            .replace(":document", data.document)
            .replace(":document_type", data.document_type)
            .replace(":business_name", data.business_name)
            .replace(":department", data.department)
            .replace(":municipality", data.municipality)
            .replace(":neighborhood", data.neighborhood)
            .replace(":address", data.address)
            .replace(":complement_address", data.complement_address)
            .replace(":phone1", data.phone1)
            .replace(":phone2", data.phone2)
            .replace(":email", data.email)
            .replace(":status", data.status)
        );
        logger.info("customerHandler --> customer:" + JSON.stringify(customer));
        if (typeof customer !== 'undefined') {
            logger.info("customer[0].affectedRows:" + customer[0].affectedRows);
            if (customer[0].affectedRows > 0) {
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
        logger.error("customerHandler --> update() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const list = async function (data) {
    logger.info("customerHandler --> list()");
    var res = new Object();
    try {
        let customer = await bdUtils.query(SQL.LIST_CUSTOMERS);
        if (typeof customer !== 'undefined' && customer.length >= 0) {
            res.status = true;
            res.message = "OK";
            res.data = customer;
        }
        return res;
    } catch (err) {
        logger.error("customerHandler --> list() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

module.exports = {
    create,
    update,
    list
};