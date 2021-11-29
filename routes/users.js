const express = require('express');
const router = express.Router();
const userRouter = require('../controller/user');

router.post('/register', userRouter.register);
router.post('/login', userRouter.login);

router.put('/:id', userRouter.edit);
router.delete('/:id', userRouter.destroy);

module.exports = router;