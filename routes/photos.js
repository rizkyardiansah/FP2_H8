const router = require("express").Router();
const photoRoute = require("../controller/photo");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, photoRoute.create);

module.exports = router;
