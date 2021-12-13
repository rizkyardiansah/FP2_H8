const express = require('express');
const router = express.Router();
const socialMediaRouter = require('../controller/socialMedia');
const verifytoken = require('../middleware/verifyToken');

router.get('/', verifytoken, socialMediaRouter.getAll);
router.post('/', verifytoken, socialMediaRouter.create);
router.put('/:id', verifytoken, socialMediaRouter.edit);
router.delete('/:id', verifytoken, socialMediaRouter.destroy);


module.exports = router;