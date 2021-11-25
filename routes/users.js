const express = require('express');
const router = express.Router();
const userRouter = require('../controller/user');

router.post('/', userRouter.create);

module.exports = router;