const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "videoList.json"
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

module.exports = class Video {
  static getData() {
    const data = video.all();
    return data;
  }
};
