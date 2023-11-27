const express = require("express");
const router = express.Router();
const videoCont = require("../controller/videoController");

router.use("/token=:tokenId/video=:getId", videoCont.fetchVideo);

module.exports = router;
