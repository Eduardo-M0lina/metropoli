const express = require("express");
const logger = require("../config/loggerUtil");
const router = express.Router();

const invCategoryService = require("./invCategoryService");
const obligationService = require("./obligationService");
const inventoryService = require("./inventoryService");
const officialService = require("./officialService");
const customerService = require("./customerService");
const providerService = require("./providerService");
const alertService = require("./alertService");
const zoneService = require("./zoneService");
const userService = require("./userService");
const pqrService = require("./pqrService");

router.use((req, res, next) => {
  logger.info(`Called:  ${req.path}`);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.use(invCategoryService);
router.use(obligationService);
router.use(inventoryService);
router.use(officialService);
router.use(customerService);
router.use(providerService);
router.use(alertService);
router.use(zoneService);
router.use(userService);
router.use(pqrService);

module.exports = router;
