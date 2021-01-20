const express = require("express");
const logger = require("../config/loggerUtil");
const handler = require("./officialHandler");

const router = express.Router();

const baseUrl = '/official';

router.get(baseUrl.concat("/test"), async (req, res) => {
    logger.info("officialService --> test");
    try {
        let response;
        response = await handler.test();
        return res.status(200).send(response);
    } catch (e) {
        logger.error("officialService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.post(baseUrl.concat("/login"), async (req, res) => {
    logger.info("officialService --> login");
    try {
        let data = req.body;
        let response;
        response = await handler.login(data);
        logger.info("Respuesta:" + JSON.stringify(response));
        return res.status(200).send(response);
    } catch (e) {
        logger.error("officialService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.post(baseUrl.concat("/create"), async (req, res) => {
    logger.info("officialService --> create");
    try {
        let data = req.body;
        let response;
        response = await handler.create(data);
        logger.info("Respuesta:" + JSON.stringify(response));
        return res.status(200).send(response);
    } catch (e) {
        logger.error("officialService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.post(baseUrl.concat("/update"), async (req, res) => {
    logger.info("officialService --> update");
    try {
        let data = req.body;
        let response;
        response = await handler.update(data);
        logger.info("Respuesta:" + JSON.stringify(response));
        return res.status(200).send(response);
    } catch (e) {
        logger.error("officialService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.post(baseUrl.concat("/updatePassword"), async (req, res) => {
    logger.info("officialService --> updatePassword");
    try {
        let data = req.body;
        let response;
        response = await handler.updatePassword(data);
        logger.info("Respuesta:" + JSON.stringify(response));
        return res.status(200).send(response);
    } catch (e) {
        logger.error("officialService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.get(baseUrl.concat("/list/:customer_id"), async (req, res) => {
    logger.info("officialService --> list");
    try {
        let response;
        let data = new Object();
        if (typeof req.params.customer_id !== 'undefined') data.customer_id = req.params.customer_id;
        logger.info("officialHandler --> list + data:" + data);
        response = await handler.list(data);
        logger.info("Respuesta:" + JSON.stringify(response));
        return res.status(200).send(response);
    } catch (e) {
        logger.error("officialService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

module.exports = router;