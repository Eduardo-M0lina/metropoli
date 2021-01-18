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
        let modules = [];
        logger.info("officialHandler --> login:" + SQL);
        let official = await bdUtils.query(SQL.LOGING.replace(":document", data.document)
            .replace(":document_type", data.document_type)
            .replace(":password", data.password));
        official.hola = 'HOLA';

        logger.info("officialHandler --> official:" + JSON.stringify(official));

        if (typeof official !== 'undefined' && official.length > 0) {
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
            official = "Usuario / Contraseña Incorrectos!"
        }

        logger.info("officialHandler -->  OFFICIAL:" + JSON.stringify(official));

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


module.exports = {
    test,
    login
};