const express = require('express');
const router = express.Router();
const userRouter = require('../controller/user');
const verifyToken = require('../middleware/verifyToken');

router.post('/register', userRouter.register);
router.post('/login', userRouter.login);

router.put('/:id', verifyToken, userRouter.edit);
router.delete('/:id', verifyToken, userRouter.destroy);

module.exports = router;