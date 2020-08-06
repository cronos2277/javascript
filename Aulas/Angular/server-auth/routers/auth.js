const express = require("express");
const router = express.Router();
const authentication = require('../controllers/authentication');
router.post("/",authentication.register);
router.put("/",authentication.login);

module.exports = router;