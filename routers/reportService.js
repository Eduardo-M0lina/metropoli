const express = require("express");
const logger = require("../config/loggerUtil");
const handler = require("./reportHandler");

const router = express.Router();

const baseUrl = '/report';

router.post(baseUrl.concat("/inventory"), async (req, res) => {
    logger.info("reportService --> inventory -> req:" + req);
    try {
        let data = req.body;
        let response;
        response = await handler.inventory(data);
        return res.status(200).send(response);
    } catch (e) {
        logger.error("reportService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.post(baseUrl.concat("/maintenanceLog"), async (req, res) => {
    logger.info("reportService --> maintenanceLog -> req:" + req);
    try {
        let data = req.body;
        let response;
        response = await handler.maintenanceLog(data);
        return res.status(200).send(response);
    } catch (e) {
        logger.error("reportService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.post(baseUrl.concat("/obligation"), async (req, res) => {
    logger.info("reportService --> obligation -> req:" + req);
    try {
        let data = req.body;
        let response;
        response = await handler.obligation(data);
        return res.status(200).send(response);
    } catch (e) {
        logger.error("reportService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.post(baseUrl.concat("/officials"), async (req, res) => {
    logger.info("reportService --> officials -> req:" + req);
    try {
        let data = req.body;
        let response;
        response = await handler.officials(data);
        return res.status(200).send(response);
    } catch (e) {
        logger.error("reportService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.post(baseUrl.concat("/pqr"), async (req, res) => {
    logger.info("reportService --> pqr -> req:" + req);
    try {
        let data = req.body;
        let response;
        response = await handler.pqr(data);
        return res.status(200).send(response);
    } catch (e) {
        logger.error("reportService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.get(baseUrl.concat("/resume/:customer_id"), async (req, res) => {
    logger.info("reportService --> list");
    try {
        let response;
        let data = new Object();
        if (typeof req.params.customer_id !== 'undefined') data.customer_id = req.params.customer_id;
        logger.info("reportHandler --> list + data:" + data);
        response = await handler.list(data);
        return res.status(200).send(response);
    } catch (e) {
        logger.error("reportService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

module.exports = router;