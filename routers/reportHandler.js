const logger = require("../config/loggerUtil");
const bdUtils = require("../config/bdUtils");
const sqlConstant = require("../config/sqlConstants");
const SQL = sqlConstant.SQL;

const inventory = async function (data) {
    logger.info("reportHandler --> inventory():" + JSON.stringify(data));
    var res = new Object();
    try {
        let where = '', date, category, provider, zone, filter;
        if (typeof data.dateRange !== 'undefined' || data.dateRange !== undefined) {
            logger.info("reportHandler --> inventory() --> dateRange");
            date = 'i.buy_date BETWEEN \'' + data.dateRange.startDate + '\' AND \'' + data.dateRange.endDate + '\' ';
            filter = true;
            where = 'WHERE ' + date;
        }
        if (typeof data.category !== 'undefined' && data.category > 0) {
            logger.info("reportHandler --> inventory() --> category");
            category = 'i.category IN (' + data.category.join() + ') ';
            where = (filter) ? where + ' AND ' + category : 'WHERE ' + category;
            filter = true;
        }
        if (typeof data.provider !== 'undefined' && data.provider > 0) {
            logger.info("reportHandler --> inventory() --> provider");
            provider = 'i.provider IN (' + data.provider.join() + ') ';
            where = (filter) ? where + ' AND ' + provider : 'WHERE ' + provider;
            filter = true;
        }
        if (typeof data.zone !== 'undefined' && data.zone > 0) {
            logger.info("reportHandler --> inventory() --> zone");
            zone = 'i.zone IN (' + data.zone.join() + ') ';
            where = (filter) ? where + ' AND ' + zone : 'WHERE ' + zone;
            filter = true;
        }
        if (typeof data.customer_id !== 'undefined' || data.customer_id !== undefined) {
            logger.info("reportHandler --> inventory() --> customer_id");
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

module.exports = {
    inventory
};