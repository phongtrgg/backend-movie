const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "userToken.json"
);

const video = {
  all: function () {
    return JSON.parse(
      fs.readFileSync(p, (err, content) => {
        if (err) {
          return [];
        }
        return JSON.parse(content);
      })
    );
  },
};

module.exports = class Token {
  static getData() {
    const data = video.all();
    return data;
  }
};
