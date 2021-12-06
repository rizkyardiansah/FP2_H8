const router = require('express').Router()
const commentRoute = require('../controller/comment')
const verifyToken = require('../middleware/verifyToken')

router.post('/', verifyToken, commentRoute.create)
router.get('/', verifyToken, commentRoute.read)
router.put('/:commentId', verifyToken, commentRoute.edit)
router.delete('/:commentId', verifyToken, commentRoute.destroy)

module.exports = router