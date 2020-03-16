const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users")
const tweets = require("./routes/api/tweets")
const passport = require('passport');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log(err))

app.get("/", (req, res) => {
  res.send("hi guy");
})

app.use("/api/users", users);
app.use("/api/tweets", tweets);
app.use(passport.initialize());
require('./config/passport')(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`))