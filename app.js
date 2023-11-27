const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const genreRouter = require("./router/genre");
const movieRouter = require("./router/movie");
const videoRouter = require("./router/video");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/movies", movieRouter);
app.use("/movies", genreRouter);
app.use("/movies", videoRouter);

app.use((req, res, next) => {
  res.status(404).send({ message: "Route not fuond" });
});

app.listen(process.env.PORT || 5000);
//http://localhost:5000/movies/token=8qlOkxz4wq/
