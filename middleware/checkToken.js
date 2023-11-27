const Token = require("../module/userTokenModule");

exports.checkToken = (req, res, next) => {
  //Lấy danh sách token
  const data = Token.getData();
  //lấy id từ url
  const token = req.params.tokenId;
  const check = [];
  //check token với id
  data.map((item) => {
    if (item.token === token) {
      check.push(item);
    }
  });

  if (check.length === 0) {
    res.status(401).send({ message: "Unauthorized" });
  }
};
