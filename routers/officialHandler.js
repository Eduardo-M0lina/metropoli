const CryptoJS = require("crypto-js");
const logger = require("../config/loggerUtil");
const bdUtils = require("../config/bdUtils");
const sqlConstant = require("../config/sqlConstants");
const SQL = sqlConstant.SQL;


const create = async function (data) {
    logger.info("officialHandler --> create()");
    var res = new Object();
    try {
        let official = await bdUtils.executeQuery(SQL.INSERT_OFFICIAL
            .replace(":document", data.document)
            .replace(":document_type", data.document_type)
            .replace(":name", data.name)
            .replace(":last_name", data.last_name)
            .replace(":municipality", data.municipality)
            .replace(":neighborhood", data.neighborhood)
            .replace(":address", data.address)
            .replace(":complement_address", data.complement_address)
            .replace(":phone1", data.phone1)
            .replace(":phone2", data.phone2)
            .replace(":email", data.email)
            .replace(":password", CryptoJS.MD5(data.password.toString()))
            .replace(":customer_id", data.customer_id)
            .replace(":role_id", data.role_id)
        );
        logger.info("officialHandler --> official:" + JSON.stringify(official));
        if (typeof official !== 'undefined') {
            res.status = true;
            res.message = "OK";
            delete data.password;
            res.data = data;
        } else {
            throw new Error("Error al crear funcionario!");
        }
        return res;
    } catch (err) {
        logger.error("officialHandler --> create() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const update = async function (data) {
    logger.info("officialHandler --> update()");
    var res = new Object();
    try {
        let official = await bdUtils.executeQuery(SQL.UPDATE_OFFICIAL
            .replace(":document", data.document)
            .replace(":document_type", data.document_type)
            .replace(":name", data.name)
            .replace(":last_name", data.last_name)
            .replace(":municipality", data.municipality)
            .replace(":neighborhood", data.neighborhood)
            .replace(":address", data.address)
            .replace(":complement_address", data.complement_address)
            .replace(":phone1", data.phone1)
            .replace(":phone2", data.phone2)
            .replace(":email", data.email)
            .replace(":role_id", data.role_id)
            .replace(":status", data.status)
        );
        logger.info("officialHandler --> official:" + JSON.stringify(official));
        if (typeof official !== 'undefined') {
            if (official[0].affectedRows > 0) {
                res.status = true;
                res.message = "OK";
                res.data = data;
            } else {
                res.status = false;
                throw new Error("Funcionario no encontrado!");
            }
        } else {
            throw new Error("Error al actualizar funcionario!");
        }
        return res;
    } catch (err) {
        logger.error("officialHandler --> update() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const updatePassword = async function (data) {
    logger.info("officialHandler --> updatePassword()");
    var res = new Object();
    try {
        let official = await bdUtils.executeQuery(SQL.UPDATE_PASSWORD
            .replace(":document", data.document)
            .replace(":document_type", data.document_type)
            .replace(":password", CryptoJS.MD5(data.password.toString()))
        );
        logger.info("officialHandler --> official:" + JSON.stringify(official));
        if (typeof official !== 'undefined') {
            if (official[0].affectedRows > 0) {
                res.status = true;
                res.message = "OK";
                res.data = "Contraseña actualizada!";
            } else {
                throw new Error("Funcionario no encontrado!");
            }
        } else {
            throw new Error("Error al actualizar contraseña!");
        }
        return res;
    } catch (err) {
        logger.error("officialHandler --> updatePassword() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const list = async function (data) {
    logger.info("officialHandler --> list()");
    var res = new Object();
    try {
        let official = await bdUtils.query(SQL.LIST_OFFICIALS
            .replace(":customer_id", data.customer_id));
        if (typeof official !== 'undefined' && official.length > 0) {
            res.status = true;
            res.message = "OK";
            res.data = official;
        } else {
            throw new Error("No existen funcionarios!");
        }
        return res;
    } catch (err) {
        logger.error("officialHandler --> list() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const listRoles = async function () {
    logger.info("officialHandler --> listRoles()");
    var res = new Object();
    try {
        let role = await bdUtils.query(SQL.LIST_ROLES_OFFICIALS);
        if (typeof role !== 'undefined' && role.length > 0) {
            res.status = true;
            res.message = "OK";
            res.data = role;
        } else {
            throw new Error("No existen roles!");
        }
        return res;
    } catch (err) {
        logger.error("officialHandler --> listRoles() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const listAll = async function (data) {
    logger.info("officialHandler --> listAll()");
    var res = new Object();
    try {
        let official = await bdUtils.query(SQL.LIST_ALL_OFFICIALS);
        if (typeof official !== 'undefined' && official.length > 0) {
            res.status = true;
            res.message = "OK";
            res.data = official;
        } else {
            throw new Error("No existen funcionarios!");
        }
        return res;
    } catch (err) {
        logger.error("officialHandler --> list() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

module.exports = {
    create,
    update,
    updatePassword,
    list,
    listRoles,
    listAll
};