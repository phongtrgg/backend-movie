const express = require("express");
const router = express.Router();
const genreCont = require("../controller/genreController");

router.use("/token=:tokenId/genre=:getId/page=:page", genreCont.getGenre);

router.use("/token=:tokenId/genre=:getId", genreCont.getGenre);

module.exports = router;
