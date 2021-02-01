const logger = require("../config/loggerUtil");
const bdUtils = require("../config/bdUtils");
const sqlConstant = require("../config/sqlConstants");
const SQL = sqlConstant.SQL;

const inventory = async function (data) {
    logger.info("reportHandler --> inventory():" + JSON.stringify(data));
    var res = new Object();
    try {
        let where = '', date, category, provider, zone, filter;
        if (typeof data.dateRange !== 'undefined' || data.dateRange !== undefined || data.dateRange !== null) {
            if (data.dateRange.startDate != null || data.dateRange.endDate != null) {
                date = 'i.buy_date BETWEEN \'' + data.dateRange.startDate + '\' AND \'' + data.dateRange.endDate + '\' ';
                filter = true;
                where = 'WHERE ' + date;
            }
        }
        if (typeof data.category !== 'undefined' && data.category > 0) {
            category = 'i.category IN (' + data.category.join() + ') ';
            where = (filter) ? where + ' AND ' + category : 'WHERE ' + category;
            filter = true;
        }
        if (typeof data.provider !== 'undefined' && data.provider > 0) {
            provider = 'i.provider IN (' + data.provider.join() + ') ';
            where = (filter) ? where + ' AND ' + provider : 'WHERE ' + provider;
            filter = true;
        }
        if (typeof data.zone !== 'undefined' && data.zone > 0) {
            zone = 'i.zone IN (' + data.zone.join() + ') ';
            where = (filter) ? where + ' AND ' + zone : 'WHERE ' + zone;
            filter = true;
        }
        if (typeof data.customer_id !== 'undefined' || data.customer_id !== undefined) {
            customer = 'i.customer_id = ' + data.customer_id;
            where = (filter) ? where + ' AND ' + customer : 'WHERE ' + customer;
            filter = true;
        }

        let report = await bdUtils.query(SQL.REPORT_INVENTORY
            .replace(":where", where));
        if (typeof report !== 'undefined' && report.length >= 0) {
            res.status = true;
            res.message = "OK";
            res.data = report;
        }
        return res;
    } catch (err) {
        logger.error("reportHandler --> inventory() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const maintenanceLog = async function (data) {
    logger.info("reportHandler --> maintenanceLog():" + JSON.stringify(data));
    var res = new Object();
    try {
        let where = '', date, inventory_id, filter;
        if (typeof data.dateRange !== 'undefined' || data.dateRange !== undefined || data.dateRange !== null) {
            if (data.dateRange.startDate != null || data.dateRange.endDate != null) {
                date = 'ml.date BETWEEN \'' + data.dateRange.startDate + '\' AND \'' + data.dateRange.endDate + '\' ';
                filter = true;
                where = 'WHERE ' + date;
            }
        }
        if (typeof data.inventory_id !== 'undefined' && data.inventory_id > 0) {
            inventory_id = 'i.id IN (' + data.inventory_id.join() + ') ';
            where = (filter) ? where + ' AND ' + inventory_id : 'WHERE ' + inventory_id;
            filter = true;
        }
        if (typeof data.customer_id !== 'undefined' || data.customer_id !== undefined) {
            customer = 'ml.customer_id = ' + data.customer_id;
            where = (filter) ? where + ' AND ' + customer : 'WHERE ' + customer;
            filter = true;
        }

        let report = await bdUtils.query(SQL.REPORT_MAINTENANCE_LOG
            .replace(":where", where));
        if (typeof report !== 'undefined' && report.length >= 0) {
            res.status = true;
            res.message = "OK";
            res.data = report;
        }
        return res;
    } catch (err) {
        logger.error("reportHandler --> maintenanceLog() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const obligation = async function (data) {
    logger.info("reportHandler --> obligation():" + JSON.stringify(data));
    var res = new Object();
    try {
        let where = '', date, obligation_id, filter;
        if (typeof data.dateRange !== 'undefined' || data.dateRange !== undefined || data.dateRange !== null) {
            if (data.dateRange.startDate != null || data.dateRange.endDate != null) {
                date = 'p.date BETWEEN \'' + data.dateRange.startDate + '\' AND \'' + data.dateRange.endDate + '\' ';
                filter = true;
                where = 'WHERE ' + date;
            }
        }
        if (typeof data.obligation_id !== 'undefined' && data.obligation_id > 0) {
            obligation_id = 'o.id IN (' + data.obligation_id.join() + ') ';
            where = (filter) ? where + ' AND ' + obligation_id : 'WHERE ' + obligation_id;
            filter = true;
        }
        if (typeof data.customer_id !== 'undefined' || data.customer_id !== undefined) {
            customer = 'p.customer_id = ' + data.customer_id;
            where = (filter) ? where + ' AND ' + customer : 'WHERE ' + customer;
            filter = true;
        }

        let report = await bdUtils.query(SQL.REPORT_OBLIGATIONS
            .replace(":where", where));
        if (typeof report !== 'undefined' && report.length >= 0) {
            res.status = true;
            res.message = "OK";
            res.data = report;
        }
        return res;
    } catch (err) {
        logger.error("reportHandler --> obligation() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const officials = async function (data) {
    logger.info("reportHandler --> officials():" + JSON.stringify(data));
    var res = new Object();
    try {
        let where = '', filter;
        if (typeof data.role_id !== 'undefined' && data.role_id > 0) {
            role_id = 'o.role_id IN (' + data.role_id.join() + ') ';
            where = (filter) ? where + ' AND ' + role_id : 'WHERE ' + role_id;
            filter = true;
        }
        if (typeof data.customer_id !== 'undefined' || data.customer_id !== undefined) {
            customer = 'o.customer_id = ' + data.customer_id;
            where = (filter) ? where + ' AND ' + customer : 'WHERE ' + customer;
            filter = true;
        }

        let report = await bdUtils.query(SQL.REPORT_OFFICIALS
            .replace(":where", where));
        if (typeof report !== 'undefined' && report.length >= 0) {
            res.status = true;
            res.message = "OK";
            res.data = report;
        }
        return res;
    } catch (err) {
        logger.error("reportHandler --> officials() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const pqr = async function (data) {
    logger.info("reportHandler --> pqr():" + JSON.stringify(data));
    var res = new Object();
    try {
        let where = '', date, type, filter;
        if (typeof data.dateRange !== 'undefined' || data.dateRange !== undefined || data.dateRange !== null) {
            if (data.dateRange.startDate != null || data.dateRange.endDate != null) {
                date = 'pqr.create_date BETWEEN \'' + data.dateRange.startDate + '\' AND \'' + data.dateRange.endDate + '\' ';
                filter = true;
                where = 'WHERE ' + date;
            }
        }
        if (typeof data.type !== 'undefined' && data.type > 0) {
            type = 'pqr.type IN (' + data.type.join() + ') ';
            where = (filter) ? where + ' AND ' + type : 'WHERE ' + type;
            filter = true;
        }
        if (typeof data.status !== 'undefined' || data.status !== undefined) {
            //status = 'pqr.status IN (' + data.status.join() + ') ';
            status = 'pqr.status = ' + data.status;
            where = (filter) ? where + ' AND ' + status : 'WHERE ' + status;
            filter = true;
        }
        if (typeof data.customer_id !== 'undefined' || data.customer_id !== undefined) {
            customer = 'pqr.customer_id = ' + data.customer_id;
            where = (filter) ? where + ' AND ' + customer : 'WHERE ' + customer;
            filter = true;
        }

        let report = await bdUtils.query(SQL.REPORT_PQR
            .replace(":where", where));
        if (typeof report !== 'undefined' && report.length >= 0) {
            res.status = true;
            res.message = "OK";
            res.data = report;
        }
        return res;
    } catch (err) {
        logger.error("reportHandler --> pqr() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

const resume = async function (data) {
    logger.info("reportHandler --> resume()");
    var res = new Object();
    try {
        let resume = await bdUtils.query(SQL.REPORT_RESUME
            .replace(":customer_id", data.customer_id));
        if (typeof resume !== 'undefined' && resume.length >= 0) {
            res.status = true;
            res.message = "OK";
            res.data = resume;
        }
        return res;
    } catch (err) {
        logger.error("reportHandler --> resume() --> Error!");
        logger.error(err);
        throw new Error(err);
    }
}

module.exports = {
    inventory,
    maintenanceLog,
    obligation,
    officials,
    pqr,
    resume
};