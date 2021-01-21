const express = require("express");
const logger = require("../config/loggerUtil");
const router = express.Router();

const officialService = require("./officialService");
const customerService = require("./customerService");

router.use((req, res, next) => {
  logger.info(`Called:  ${req.path}`);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.use(officialService);
router.use(customerService);

module.exports = router;
