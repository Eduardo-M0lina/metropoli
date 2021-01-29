const express = require("express");
const logger = require("../config/loggerUtil");
const handler = require("./reportHandler");

const router = express.Router();

const baseUrl = '/report';

router.post(baseUrl.concat("/inventory"), async (req, res) => {
    logger.info("reportService --> inventory -> req:"+ req);
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

module.exports = router;