const CryptoJS = require("crypto-js");
const logger = require("../config/loggerUtil");
const bdUtils = require("../config/bdUtils");
const sqlConstant = require("../config/sqlConstants");
const SQL = sqlConstant.SQL;

const login = async function (data) {
    logger.info("userHandler --> login()");
    var res = new Object();
    try {
        logger.info("userHandler --> login MD5:" + CryptoJS.MD5(data.password.toString()));
        let modules = [];
        let user = await bdUtils.query(SQL.LOGING_USER.replace(":document", data.document)
            .replace(":document_type", data.document_type)
            .replace(":password", CryptoJS.MD5(data.password.toString())));

        if (typeof user == 'undefined' || user.length == 0) {
            user = await bdUtils.query(SQL.LOGING.replace(":document", data.document)
                .replace(":document_type", data.document_type)
                .replace(":password", CryptoJS.MD5(data.password.toString())));
        }
        if (typeof user !== 'undefined' && user.length > 0) {
            if (user[0].status == 1) {
                let module_options = await bdUtils.query(SQL.ROLES_OPTIONS.replace(":role_id", user[0].role_id));
                logger.info("userHandler --> module_options:" + JSON.stringify(module_options));
                user[0].modules = [];
                let modulesAux = [];
                module_options.forEach(element => {
                    let module = new Object();
                    module.id = element.module_id;
                    module.name = element.module_name;
                    module.options = [];
                    //logger.info("userHandler --> module:" + JSON.stringify(module));
                    modulesAux.push(module);
                });
                modules = getUniqueListBy(modulesAux, 'id');
                //logger.info("userHandler --> modules:" + JSON.stringify(modules));
                modules.forEach(module => {
                    module_options.forEach(m_o => {
                        if (m_o.module_id == module.id) {
                            let option = new Object();
                            option.id = m_o.option_id;
                            option.name = m_o.option_name;
                            module.options.push(option);
                        }
                    });
                });
                //logger.info("userHandler --> modules:" + JSON.stringify(modules));
                user[0].modules = modules;
            } else {
                throw new Error("El usuario se encuentra deshabilitado!");
            }
        } else {
            throw new Error("Usuario / Contraseña Incorrectos!");
        }
        //logger.info("userHandler -->  user:" + JSON.stringify(user));
        res.status = true;
        res.message = "OK";
        res.data = user[0];
        return res;
    } catch (err) {
        logger.error("userHandler --> login() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

const create = async function (data) {
    logger.info("userHandler --> create()");
    var res = new Object();
    try {
        let user = await bdUtils.executeQuery(SQL.INSERT_USER
            .replace(":document", data.document)
            .replace(":document_type", data.document_type)
            .replace(":name", data.name)
            .replace(":last_name", data.last_name)
            .replace(":phone", data.phone)
            .replace(":email", data.email)
            .replace(":password", CryptoJS.MD5(data.password.toString()))
            .replace(":role_id", data.role_id)
        );
        logger.info("userHandler --> user:" + JSON.stringify(user));
        if (typeof user !== 'undefined') {
            res.status = true;
            res.message = "OK";
            res.data = data;
        } else {
            throw new Error("Error al crear cliente!");
        }
        return res;
    } catch (err) {
        logger.error("userHandler --> create() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const update = async function (data) {
    logger.info("userHandler --> update()");
    var res = new Object();
    try {
        let user = await bdUtils.executeQuery(SQL.UPDATE_USER
            .replace(":document", data.document)
            .replace(":document_type", data.document_type)
            .replace(":name", data.name)
            .replace(":last_name", data.last_name)
            .replace(":phone", data.phone)
            .replace(":email", data.email)
            .replace(":role_id", data.role_id)
            .replace(":status", data.status)
        );
        logger.info("userHandler --> user:" + JSON.stringify(user));
        if (typeof user !== 'undefined') {
            logger.info("user[0].affectedRows:" + user[0].affectedRows);
            if (user[0].affectedRows > 0) {
                res.status = true;
                res.message = "OK";
                res.data = data;
            } else {
                throw new Error("Usuario no encontrado!");
            }

        } else {
            throw new Error("Error al actualizar usuario!");
        }
        return res;
    } catch (err) {
        logger.error("userHandler --> update() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const updatePassword = async function (data) {
    logger.info("userHandler --> updatePassword()");
    var res = new Object();
    try {
        let user = await bdUtils.executeQuery(SQL.UPDATE_PASSWORD_USER
            .replace(":document", data.document)
            .replace(":document_type", data.document_type)
            .replace(":password", CryptoJS.MD5(data.password.toString()))
        );
        if (typeof user !== 'undefined') {
            if (user[0].affectedRows == 0) {
                user = await bdUtils.executeQuery(SQL.UPDATE_PASSWORD
                    .replace(":document", data.document)
                    .replace(":document_type", data.document_type)
                    .replace(":password", CryptoJS.MD5(data.password.toString()))
                );
            }
        }
        logger.info("userHandler --> user:" + JSON.stringify(user));
        if (typeof user !== 'undefined') {
            if (user[0].affectedRows > 0) {
                res.status = true;
                res.message = "OK";
                res.data = "Contraseña actualizada!";
            } else {
                throw new Error("Usuario no encontrado!");
            }
        } else {
            throw new Error("Error al actualizar contraseña!");
        }
        return res;
    } catch (err) {
        logger.error("userHandler --> updatePassword() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const list = async function () {
    logger.info("userHandler --> list()");
    var res = new Object();
    try {
        let user = await bdUtils.query(SQL.LIST_USERS);
        if (typeof user !== 'undefined' && user.length >= 0) {
            res.status = true;
            res.message = "OK";
            res.data = user;
        }
        return res;
    } catch (err) {
        logger.error("userHandler --> list() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const listRoles = async function () {
    logger.info("userHandler --> listRoles()");
    var res = new Object();
    try {
        let user = await bdUtils.query(SQL.LIST_ROLES_USERS);
        if (typeof user !== 'undefined' && user.length >= 0) {
            res.status = true;
            res.message = "OK";
            res.data = user;
        }
        return res;
    } catch (err) {
        logger.error("userHandler --> listRoles() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

module.exports = {
    login,
    create,
    update,
    updatePassword,
    list,
    listRoles
};