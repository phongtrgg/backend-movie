const Genre = require("../module/genreModule");
const Movie = require("../module/movieModule");
const paging = require("../middleware/paging");
const userToken = require("../middleware/checkToken");
const checkToken = userToken.checkToken;

exports.getGenre = (req, res, next) => {
  //lấy id thể loại phim
  const genreId = Number(req.params.getId);
  //lấy số trang
  const page = Number(req.params.page);
  //lấy data các thể loại đang có
  const data = Genre.getData();
  //array chứa thể loại phim sau khi lọc
  const newDataGenre = [];
  checkToken(req, res, next);
  data.map((item) => {
    //so sanh id từ url với id của thể loại phim
    if (item.id === genreId) {
      newDataGenre.push(item);
    }
  });
  //check xem có id trùng ko nếu array rỗng trả về thông báo lỗi
  if (newDataGenre.length === 0) {
    res.status(400).send({ message: "Not found that gerne id" });
  } else {
    //lấy all phim
    const dataMovies = Movie.getData();
    //array chứa phim sau khi lọc
    const updateData = [];
    dataMovies.map((item) => {
      //lặp qua all phim đến mục genre_ids lại lặp tiếp vì phim có thể
      //có nhiều thể loại cùng 1 lúc nếu trùng 1 trong số id thì push vào
      item.genre_ids.map((id) => {
        if (id === genreId) {
          updateData.push(item);
        }
      });
    });
    const dataDown = updateData.sort(function (a, b) {
      return a.vote_average - b.vote_average;
    });
    //lọc lại danh sách theo thứ tự rate cao để render
    const genreMovieRateUp = dataDown.reverse();
    //tên thể loại
    const type = newDataGenre[0].name;
    //sau đó truyền vào hàm lọc theo từng trang để lấy ra số lượng
    //cần thiết để render
    const resData = paging.getData(page, genreMovieRateUp, type);
    // console.log(getMovie(page, genreMovieRateUp, type));
    if (resData[0].total_pages === 0) {
      res.status(400).send({ message: "Not found gerne parram" });
    } else {
      res.status(200).send(resData);
    }
  }
};
