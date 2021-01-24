const express = require("express");
const logger = require("../config/loggerUtil");
const handler = require("./pqrHandler");

const router = express.Router();

const baseUrl = '/pqr';

router.post(baseUrl.concat("/create"), async (req, res) => {
    logger.info("pqrService --> create");
    try {
        let data = req.body;
        let response;
        response = await handler.create(data);
        return res.status(200).send(response);
    } catch (e) {
        logger.error("pqrService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.post(baseUrl.concat("/update"), async (req, res) => {
    logger.info("pqrService --> update");
    try {
        let data = req.body;
        let response;
        response = await handler.update(data);
        return res.status(200).send(response);
    } catch (e) {
        logger.error("pqrService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.get(baseUrl.concat("/list/:customer_id"), async (req, res) => {
    logger.info("pqrService --> list");
    try {
        let response;
        let data = new Object();
        if (typeof req.params.customer_id !== 'undefined') data.customer_id = req.params.customer_id;
        logger.info("pqrHandler --> list + data:" + data);
        response = await handler.list(data);
        return res.status(200).send(response);
    } catch (e) {
        logger.error("pqrService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.get(baseUrl.concat("/listAll"), async (req, res) => {
    logger.info("pqrService --> listAll");
    try {
        let response;
        response = await handler.listAll();
        return res.status(200).send(response);
    } catch (e) {
        logger.error("pqrService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.get(baseUrl.concat("/listByCreator/:customer_id/document/:document/document_type/:document_type"), async (req, res) => {
    logger.info("pqrService --> listByCreator");
    try {
        let response;
        let data = new Object();
        if (typeof req.params.customer_id !== 'undefined') data.customer_id = req.params.customer_id;
        if (typeof req.params.document !== 'undefined') data.document = req.params.document;
        if (typeof req.params.document_type !== 'undefined') data.document_type = req.params.document_type;
        logger.info("pqrHandler --> listByCreator + data:" + data);
        response = await handler.listByCreator(data);
        return res.status(200).send(response);
    } catch (e) {
        logger.error("pqrService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

module.exports = router;