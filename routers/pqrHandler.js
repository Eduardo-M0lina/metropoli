const logger = require("../config/loggerUtil");
const bdUtils = require("../config/bdUtils");
const sqlConstant = require("../config/sqlConstants");
const SQL = sqlConstant.SQL;

const create = async function (data) {
    logger.info("pqrHandler --> create()");
    var res = new Object();
    try {
        let pqr = await bdUtils.executeQuery(SQL.INSERT_PQR
            .replace(":customer_id", data.customer_id)
            .replace(":create_document", data.create_document)
            .replace(":create_document_type", data.create_document_type)
            .replace(":description", data.description)
            .replace(":location", data.location)
        );
        logger.info("pqrHandler --> pqr:" + JSON.stringify(pqr));
        if (typeof pqr !== 'undefined') {
            res.status = true;
            res.message = "OK";
            res.data = data;
        } else {
            throw new Error("Error al crear solicitud PQR!");
        }
        return res;
    } catch (err) {
        logger.error("pqrHandler --> create() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const update = async function (data) {
    logger.info("pqrHandler --> update()");
    var res = new Object();
    try {
        let pqr = await bdUtils.executeQuery(SQL.UPDATE_PQR
            .replace(":id", data.id)
            .replace(":update_document", data.update_document)
            .replace(":update_document_type", data.update_document_type)
            .replace(":observation", data.observation)
        );
        logger.info("pqrHandler --> pqr:" + JSON.stringify(pqr));
        if (typeof pqr !== 'undefined') {
            logger.info("pqr[0].affectedRows:" + pqr[0].affectedRows);
            if (pqr[0].affectedRows > 0) {
                res.status = true;
                res.message = "OK";
                res.data = data;
            } else {
                throw new Error("solicitud PQR no encontrado!");
            }
        } else {
            throw new Error("Error al actualizar solicitud PQR!");
        }
        return res;
    } catch (err) {
        logger.error("pqrHandler --> update() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const list = async function (data) {
    logger.info("pqrHandler --> list()");
    var res = new Object();
    try {
        let pqr = await bdUtils.query(SQL.LIST_PQRS);
        if (typeof pqr !== 'undefined' && pqr.length > 0) {
            res.status = true;
            res.message = "OK";
            res.data = pqr;
        } else {
            throw new Error("No existen solicitudes PQR!");
        }
        return res;
    } catch (err) {
        logger.error("pqrHandler --> list() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

module.exports = {
    create,
    update,
    list
};