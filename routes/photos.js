const router = require("express").Router();
const photoRoute = require("../controller/photo");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, photoRoute.create);
router.put('/:photoId', verifyToken, photoRoute.edit)
router.delete('/:photoId', verifyToken, photoRoute.destroy)

module.exports = router;
