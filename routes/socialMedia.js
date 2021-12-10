const express = require('express');
const router = express.Router();
const socialMediaRouter = require('../controller/socialMedia');
const verifytoken = require('../middleware/verifyToken');
const { route } = require('./users');


router.get('/', verifytoken, socialMediaRouter.getAll);
router.post('/', verifytoken, socialMediaRouter.create);


module.exports = router;