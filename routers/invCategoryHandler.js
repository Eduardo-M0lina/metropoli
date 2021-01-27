const logger = require("../config/loggerUtil");
const bdUtils = require("../config/bdUtils");
const sqlConstant = require("../config/sqlConstants");
const SQL = sqlConstant.SQL;

const create = async function (data) {
    logger.info("invCategoryHandler --> create()");
    var res = new Object();
    try {
        let invCategory = await bdUtils.executeQuery(SQL.INSERT_INVCATEGORY
            .replace(":name", data.name)
            .replace(":customer_id", data.customer_id)
        );
        logger.info("invCategoryHandler --> invCategory:" + JSON.stringify(invCategory));
        if (typeof invCategory !== 'undefined') {
            res.status = true;
            res.message = "OK";
            res.data = data;
        } else {
            throw new Error("Error al crear cliente!");
        }
        return res;
    } catch (err) {
        logger.error("invCategoryHandler --> create() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const update = async function (data) {
    logger.info("invCategoryHandler --> update()");
    var res = new Object();
    try {
        let invCategory = await bdUtils.executeQuery(SQL.UPDATE_INVCATEGORY
            .replace(":id", data.id)
            .replace(":name", data.name)
            .replace(":status", data.status)
        );
        logger.info("invCategoryHandler --> invCategory:" + JSON.stringify(invCategory));
        if (typeof invCategory !== 'undefined') {
            logger.info("invCategory[0].affectedRows:" + invCategory[0].affectedRows);
            if (invCategory[0].affectedRows > 0) {
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
        logger.error("invCategoryHandler --> update() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const list = async function (data) {
    logger.info("invCategoryHandler --> list()");
    var res = new Object();
    try {
        let invCategory = await bdUtils.query(SQL.LIST_INVCATEGORYS
            .replace(":customer_id", data.customer_id));
        if (typeof invCategory !== 'undefined' && invCategory.length >= 0) {
            res.status = true;
            res.message = "OK";
            res.data = invCategory;
        }
        return res;
    } catch (err) {
        logger.error("invCategoryHandler --> list() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

module.exports = {
    create,
    update,
    list
};