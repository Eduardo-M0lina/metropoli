const express = require("express");
const logger = require("../config/loggerUtil");
const handler = require("./officialHandler");

const router = express.Router();

router.get("/test", async (req, res) => {
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

router.post("/login", async (req, res) => {
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

module.exports = router;