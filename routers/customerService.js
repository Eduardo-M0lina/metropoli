const express = require("express");
const logger = require("../config/loggerUtil");
const handler = require("./customerHandler");

const router = express.Router();

const baseUrl = '/customer';

router.post(baseUrl.concat("/create"), async (req, res) => {
    logger.info("customerService --> create");
    try {
        let data = req.body;
        let response;
        response = await handler.create(data);
        logger.info("Respuesta:" + JSON.stringify(response));
        return res.status(200).send(response);
    } catch (e) {
        logger.error("customerService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.post(baseUrl.concat("/update"), async (req, res) => {
    logger.info("customerService --> update");
    try {
        let data = req.body;
        let response;
        response = await handler.update(data);
        logger.info("Respuesta:" + JSON.stringify(response));
        return res.status(200).send(response);
    } catch (e) {
        logger.error("customerService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.get(baseUrl.concat("/list"), async (req, res) => {
    logger.info("customerService --> list");
    try {
        let response;
        let data = new Object();
        response = await handler.list();
        logger.info("Respuesta:" + JSON.stringify(response));
        return res.status(200).send(response);
    } catch (e) {
        logger.error("customerService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

module.exports = router;