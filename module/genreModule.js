const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "genreList.json"
);

const Movies = {
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

module.exports = class Genre {
  static getData() {
    const data = Movies.all();
    return data;
  }
};
