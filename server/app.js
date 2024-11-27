var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
var fsPromise = require("fs/promises");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "project7",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

let tableFiles = ["comment", "ident", "post", "todo", "user"];

async function createTables(fileArr) {
  for (let i = 0; i < fileArr.length; i++) {
    let route = `./entities/${fileArr[i]}.json`;
    try {
      const res = await fsPromise.readFile(route, "utf8");
      let tableRows = JSON.parse(res);
      let s = "";
      for (let key in tableRows) {
        s += `${key} ${tableRows[key]},`;
      }
      s = s.slice(0, -1);

      let sql = `CREATE TABLE ${fileArr[i]} (${s})`;
      console.log("sql: ", sql);

      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    } catch (error) {
      console.error(error);
    }
  }
}

createTables(tableFiles);

module.exports = app;
