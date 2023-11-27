const express = require("express");
const router = express.Router();
const movieCont = require("../controller/movieController");

router.use(
  "/token=:tokenId/trending/page=:pageId",
  movieCont.fetchTrending
);

router.use("/token=:tokenId/trending/", movieCont.fetchTrending);

router.use(
  "/token=:tokenId/top-rate/page=:pageId",
  movieCont.fetchTopRate
);

router.use("/token=:tokenId/top-rate", movieCont.fetchTopRate);

////////////////////////////////////////// search router//////////////////////////////////////
router.use(
  "/token=:tokenId/search/key=:getId/page=:pageId",
  movieCont.searchMovie
);
router.use("/token=:tokenId/search/key=:getId", movieCont.searchMovie);

router.use(
  "/token=:tokenId/search/year=:getId/page=:pageId",
  movieCont.searchYear
);

router.use("/token=:tokenId/search/year=:getId", movieCont.searchYear);

router.use(
  "/token=:tokenId/search/language=:getId/page=:pageId",
  movieCont.searchLanguage
);

router.use(
  "/token=:tokenId/search/language=:getId",
  movieCont.searchLanguage
);

router.use(
  "/token=:tokenId/search/mediaType=:getId/page=:pageId",
  movieCont.searchMediaType
);

router.use(
  "/token=:tokenId/search/mediaType=:getId",
  movieCont.searchMediaType
);

router.use(
  "/token=:tokenId/search/genre=:getId/page=:pageId",
  movieCont.searchGenre
);

router.use("/token=:tokenId/search/genre=:getId", movieCont.searchGenre);

module.exports = router;
