import createError from "http-errors";
import express from "express";
import logger from "morgan";

import indexRoute from "./infrastructure/routes/index.routes";
import productsRoute from "./infrastructure/routes/product.routes";
import categoriesRoute from "./infrastructure/routes/category.routes";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/", productsRoute);
app.use("/", categoriesRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
}) as express.ErrorRequestHandler);

export default app;
