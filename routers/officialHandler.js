const CryptoJS = require("crypto-js");
const logger = require("../config/loggerUtil");
const bdUtils = require("../config/bdUtils");
const sqlConstant = require("../config/sqlConstants");
const SQL = sqlConstant.SQL;

const test = async function () {
    logger.info("officialHandler --> test()");
    var res = new Object();
    try {
        let result = await bdUtils.query("SELECT * FROM ROLES");
        //logger.info("officialHandler --> result" + result);
        res.status = true;
        res.message = "OK";
        res.data = result
        return res;
    } catch (err) {
        logger.error("officialHandler --> test() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const login = async function (data) {
    logger.info("officialHandler --> login()");
    var res = new Object();
    try {
        logger.info("officialHandler --> login MD5:" + CryptoJS.MD5(data.password.toString()));
        let modules = [];
        //logger.info("officialHandler --> login:" + SQL);
        let official = await bdUtils.query(SQL.LOGING.replace(":document", data.document)
            .replace(":document_type", data.document_type)
            .replace(":password", CryptoJS.MD5(data.password.toString())));
        //logger.info("officialHandler --> official:" + JSON.stringify(official));
        if (typeof official !== 'undefined' && official.length > 0) {
            if (official[0].status == 1) {
                let module_options = await bdUtils.query(SQL.ROLES_OPTIONS.replace(":role_id", official[0].role_id));
                official[0].modules = [];
                let modulesAux = [];
                module_options.forEach(element => {
                    let module = new Object();
                    module.id = element.module_id;
                    module.name = element.module_name;
                    module.options = [];
                    //logger.info("officialHandler --> module:" + JSON.stringify(module));
                    modulesAux.push(module);
                });
                modules = getUniqueListBy(modulesAux, 'id');
                //logger.info("officialHandler --> modules:" + JSON.stringify(modules));
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
                //logger.info("officialHandler --> modules:" + JSON.stringify(modules));
                official[0].modules = modules;
            } else {
                res.status = false;
                res.message = "El usuario se encuentra inactivo!"
                return res;
            }
        } else {
            res.status = false;
            res.message = "Usuario / Contraseña Incorrectos!"
            return res;
        }
        //logger.info("officialHandler -->  OFFICIAL:" + JSON.stringify(official));
        res.status = true;
        res.message = "OK";
        res.data = official;
        return res;
    } catch (err) {
        logger.error("officialHandler --> login() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

const create = async function (data) {
    logger.info("officialHandler --> create()");
    var res = new Object();
    try {
        //logger.info("officialHandler --> create:" + SQL);
        let official = await bdUtils.executeQuery(SQL.INSERT_OFFICIALS
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
            res.status = false;
            res.message = "Error al crear funcionario!";
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
        //logger.info("officialHandler --> update:" + SQL);
        let official = await bdUtils.executeQuery(SQL.UPDATE_OFFICIALS
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
            if (official.affectedRows > 0) {
                res.status = true;
                res.message = "OK";
                res.data = data;
            } else {
                res.status = false;
                res.message = "Funcionario no encontrado!";
            }

        } else {
            res.status = false;
            res.message = "Error al actualizar funcionario!";
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
        //logger.info("officialHandler --> updatePassword:" + SQL);
        let official = await bdUtils.executeQuery(SQL.UPDATE_PASSWORD
            .replace(":document", data.document)
            .replace(":document_type", data.document_type)
            .replace(":password", CryptoJS.MD5(data.password.toString()))
        );
        logger.info("officialHandler --> official:" + JSON.stringify(official));
        if (typeof official !== 'undefined') {
            if (official.affectedRows > 0) {
                res.status = true;
                res.message = "OK";
                res.data = "Contraseña actualizada!";
            } else {
                res.status = false;
                res.message = "Funcionario no encontrado!";
            }
        } else {
            res.status = false;
            res.message = "Error al actualizar contraseña!";
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
        //logger.info("officialHandler --> list:" + SQL);
        let official = await bdUtils.query(SQL.LIST_OFFICIALS
            .replace(":customer_id", data.customer_id));
        //logger.info("officialHandler --> official:" + JSON.stringify(official));
        if (typeof official !== 'undefined' && official.length > 0) {
            res.status = true;
            res.message = "OK";
            res.data = official;
        } else {
            res.status = false;
            res.message = "No existen funcionarios!"
        }
        //logger.info("officialHandler -->  OFFICIAL:" + JSON.stringify(official));
        return res;
    } catch (err) {
        logger.error("officialHandler --> list() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

module.exports = {
    test,
    login,
    create,
    update,
    updatePassword,
    list
};