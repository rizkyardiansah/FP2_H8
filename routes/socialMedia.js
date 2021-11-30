const express = require('express');
const router = express.Router();
const socialMediaRouter = require('../controller/socialMedia');

router.post('/', socialMediaRouter.create);

module.exports = router;