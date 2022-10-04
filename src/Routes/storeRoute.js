const express = require("express");
const router = express.Router();
const storeController = require("../Controller/storeController");

router
    .route("/")
    .get(storeController.getStores)
    .post(storeController.createStore);

router.get("/", storeController.getStoreById)
module.exports = router;