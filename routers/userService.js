const express = require("express");
const logger = require("../config/loggerUtil");
const handler = require("./userHandler");

const router = express.Router();

const baseUrl = '/user';

router.post(baseUrl.concat("/login"), async (req, res) => {
    logger.info("userService --> login");
    try {
        let data = req.body;
        let response;
        response = await handler.login(data);
        logger.info("Respuesta:" + JSON.stringify(response));
        return res.status(200).send(response);
    } catch (e) {
        logger.error("userService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.post(baseUrl.concat("/create"), async (req, res) => {
    logger.info("userService --> create");
    try {
        let data = req.body;
        let response;
        response = await handler.create(data);
        logger.info("Respuesta:" + JSON.stringify(response));
        return res.status(200).send(response);
    } catch (e) {
        logger.error("userService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.post(baseUrl.concat("/update"), async (req, res) => {
    logger.info("userService --> update");
    try {
        let data = req.body;
        let response;
        response = await handler.update(data);
        logger.info("Respuesta:" + JSON.stringify(response));
        return res.status(200).send(response);
    } catch (e) {
        logger.error("userService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.post(baseUrl.concat("/updatePassword"), async (req, res) => {
    logger.info("userService --> updatePassword");
    try {
        let data = req.body;
        let response;
        response = await handler.updatePassword(data);
        logger.info("Respuesta:" + JSON.stringify(response));
        return res.status(200).send(response);
    } catch (e) {
        logger.error("userService --> Error:" + e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
});

router.get(baseUrl.concat("/list"), async (req, res) => {
    logger.info("userService --> list");
    try {
        let response;
        response = await handler.list();
        logger.info("Respuesta:" + JSON.stringify(response));
        return res.status(200).send(response);
    } catch (e) {
        logger.error("userService --> Error:" + e.message);
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

module.exports = router;