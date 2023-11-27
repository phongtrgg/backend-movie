const Movie = require("../module/movieModule");
const userToken = require("../middleware/checkToken");
const checkToken = userToken.checkToken;
const paging = require("../middleware/paging");
const Token = require("../module/userTokenModule");

const checkT = (req) => {
  const data = Token.getData();
  const token = req.params.tokenId;
  const check = [];
  data.map((item) => {
    if (item.token === token) {
      check.push(item);
    }
  });

  if (check.length === 0) {
    res.status(401).send({ message: "Unauthorized" });
  }
};
/**hàm check params và tạo 1 số data trùng lặp */
const checkParams = (req) => {
  //get all movie
  const data = Movie.getData();
  const searchData = [];
  const type = req.params.getId;
  const page = req.params.pageId || 1;
  return { data, searchData, type, page };
};
/**Hàm check data trước khi gửi đi */
const checkResData = (resData, res, message) => {
  if (resData[0].total_pages === 0) {
    res.status(400).send({ message: message });
  } else {
    res.status(200).send(resData);
  }
};
/**hàm để lấy movie theo thứ tự rate từ cao xuống thấp */
const getDataRateUp = (data) => {
  const dataDown = data.sort(function (a, b) {
    return a.vote_average - b.vote_average;
  });
  const dataUp = dataDown.reverse();
  return dataUp;
};

exports.fetchTrending = (req, res, next) => {
  const { data, page } = checkParams(req);
  checkT(req);
  //lọc theo kiểu dữ liệu tăng dần
  const dataDown = data.sort(function (a, b) {
    return a.popularity - b.popularity;
  });
  //chuyển lại thành kiểu dữ liệu giảm dần để lấy movie rate cao trước
  const dataUp = dataDown.reverse();
  //lấy data thông qua đối số page với data đã sắp xếp
  const resData = paging.getData(page, dataUp, null);
  checkResData(resData, res, "No have movie");
};

exports.fetchTopRate = (req, res, next) => {
  checkT(req);
  const { data, page } = checkParams(req);
  const dataUp = getDataRateUp(data);
  const resData = paging.getData(page, dataUp, null);
  checkResData(resData, res, "No have movie");
};

//search theo từ khoá
exports.searchMovie = (req, res, next) => {
  const { data, type, searchData, page } = checkParams(req);
  const key = String(type).toLocaleUpperCase();
  checkToken(req, res, next);
  data.map((item) => {
    //đổi lại sang kiểu string và viết hoa tất cả trước khi search
    //vì vậy dù có nhập chữ hoa hay thường đều quy về 1 để so sánh
    const title = String(item.title).toLocaleUpperCase();
    const name = String(item.name).toLocaleUpperCase();
    const overview = String(item.overview).toLocaleUpperCase();
    //check từ khoá với title name và overview có 1 trong 3 thì push array
    if (title.search(key) !== -1) {
      searchData.push(item);
    } else if (name.search(key) !== -1) {
      searchData.push(item);
    } else if (overview.search(key) !== -1) {
      searchData.push(item);
    }
  });
  const resData = paging.getData(page, searchData, null);
  checkResData(resData, res, "Not found keyword parram");
};

//search theo thể loại
exports.searchGenre = (req, res, next) => {
  const { data, searchData, type, page } = checkParams(req);
  checkToken(req, res, next);
  const fixType = Number(type);
  data.map((item) => {
    item.genre_ids.map((i) => {
      if (i === fixType) {
        searchData.push(item);
      }
    });
  });
  const dataUp = getDataRateUp(searchData);
  const resData = paging.getData(page, dataUp, null);
  checkResData(resData, res, "Not found that gerne id");
};

//search theo type gồm có [ movie, tv]
exports.searchMediaType = (req, res, next) => {
  const { data, searchData, type, page } = checkParams(req);
  checkToken(req, res, next);
  const fixType = String(type);
  data.map((item) => {
    if (item.media_type === fixType) {
      searchData.push(item);
    }
  });
  const dataUp = getDataRateUp(searchData);
  const resData = paging.getData(page, dataUp, null);
  checkResData(resData, res, "Not found that Media Type");
};

//search theo ngôn ngữ gồm có [en, es, ko, de, it, ja, fr]
exports.searchLanguage = (req, res, next) => {
  const { data, searchData, type, page } = checkParams(req);
  checkToken(req, res, next);
  const fixType = String(type);
  data.map((item) => {
    if (item.original_language === fixType) {
      searchData.push(item);
    }
  });
  const dataUp = getDataRateUp(searchData);
  const resData = paging.getData(page, dataUp, null);
  checkResData(resData, res, "Not found that language");
};

//search theo năm
exports.searchYear = (req, res, next) => {
  const { data, searchData, type, page } = checkParams(req);
  checkToken(req, res, next);
  const fixType = String(type);
  data.map((item) => {
    const fixYear = String(item.release_date);
    if (fixYear.search(fixType) !== -1) {
      searchData.push(item);
    }
  });
  const dataUp = getDataRateUp(searchData);
  const resData = paging.getData(page, dataUp, null);
  checkResData(resData, res, "Not found that Year");
};
