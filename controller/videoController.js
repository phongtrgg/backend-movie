const Video = require("../module/videoModule");
const userToken = require("../middleware/checkToken");
const checkToken = userToken.checkToken;

exports.fetchVideo = (req, res, next) => {
  const id = Number(req.params.getId);
  checkToken(req, res, next);
  const dataVideo = Video.getData();
  const newData = [];
  const checkId = [];
  dataVideo.map((item) => {
    if (item.id === id) {
      checkId.push(item);
    }
  });
  //check id nếu aray có length = 0 nghĩa là ko có trùng id trả về lỗi
  if (checkId && checkId.length === 0) {
    return res.status(400).send({ message: "Not found film_id parram" });
  }
  //qua bước check id sẽ check chi tiết để lấy ra video phù hợp
  checkId.map((item) => {
    item.videos.map((i) => {
      if (i.site !== "YouTube") {
      }
      if (i.official === false) {
        return;
      }
      if (i.type !== "Trailer") {
        if (i.type !== "Teaser") {
          return;
        }
      }
      newData.push(item);
    });
  });
  //valid xong video sẽ check tiếp độ dài nếu = 0 trả về lỗi
  if (newData.length === 0) {
    return res.status(400).send({ message: "Not found video" });
  } else {
    //qua được hết các bước thì ta sắp xếp lại thứ tự video theo thời gian
    //phát hành và gửi đi
    const dataDown = newData.sort(function (a, b) {
      return a.published_at - b.published_at;
    });
    const resData = dataDown.reverse();

    res.status(200).send({ results: resData, ok: true });
  }
};
