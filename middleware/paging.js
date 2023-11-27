exports.getData = (pageNumber, data, name) => {
  //số lượng gửi về 1 trang
  let pageSize = 20;
  //số trang
  let page = Number(pageNumber) || 1;
  //phạm vi bắt đầu để lọc trong array
  const start = (page - 1) * pageSize;
  //phạm vi kết thúc để lọc trong array
  const end = start + pageSize;
  //lọc lấy data phù hợp theo điểm bắt đầu và kết thúc
  const resMovie = data.slice(start, end);
  //tổng số trang
  const totalPage = data.length / pageSize;
  //data cuối cùng trả về
  const resData = [];
  if (!name) {
    resData.push({
      page: page,
      total_pages: Number(totalPage.toFixed()),
      results: resMovie,
      ok: true,
    });
  } else {
    resData.push({
      page: page,
      total_pages: Number(totalPage.toFixed()),
      results: resMovie,
      ok: true,
      genre_name: name,
    });
  }

  return resData;
};
