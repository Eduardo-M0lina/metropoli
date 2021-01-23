const express = require("express");
const logger = require("../config/loggerUtil");
const handler = require("./officialHandler");

const router = express.Router();

const baseUrl = '/official';

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

router.get(baseUrl.concat("/listRoles"), async (req, res) => {
    logger.info("userService --> listRoles");
    try {
        let response;
        response = await handler.listRoles();
        logger.info("Respuesta:" + JSON.stringify(response));
        return res.status(200).send(response);
    } catch (e) {
        logger.error("userService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.get(baseUrl.concat("/listAll"), async (req, res) => {
    logger.info("officialService --> listAll");
    try {
        let response;
        response = await handler.listAll();
        logger.info("Respuesta:" + JSON.stringify(response));
        return res.status(200).send(response);
    } catch (e) {
        logger.error("officialService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

module.exports = router;