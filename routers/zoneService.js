const express = require("express");
const logger = require("../config/loggerUtil");
const handler = require("./zoneHandler");

const router = express.Router();

const baseUrl = '/zone';

router.post(baseUrl.concat("/create"), async (req, res) => {
    logger.info("zoneService --> create");
    try {
        let data = req.body;
        let response;
        response = await handler.create(data);
        return res.status(200).send(response);
    } catch (e) {
        logger.error("zoneService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.post(baseUrl.concat("/update"), async (req, res) => {
    logger.info("zoneService --> update");
    try {
        let data = req.body;
        let response;
        response = await handler.update(data);
        return res.status(200).send(response);
    } catch (e) {
        logger.error("zoneService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.get(baseUrl.concat("/list/:customer_id"), async (req, res) => {
    logger.info("zoneService --> list");
    try {
        let response;
        let data = new Object();
        if (typeof req.params.customer_id !== 'undefined') data.customer_id = req.params.customer_id;
        logger.info("zoneHandler --> list + data:" + data);
        response = await handler.list(data);
        return res.status(200).send(response);
    } catch (e) {
        logger.error("zoneService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

module.exports = router;