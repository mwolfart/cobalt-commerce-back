import createError from "http-errors";
import express from "express";
import logger from "morgan";

import indexRoute from "./infrastructure/routes/index.routes";
import { createCategoryRoutes } from "./infrastructure/routes/category.routes";
import { createProductRoutes } from "./infrastructure/routes/product.routes";

const createApp = async () => {
    const app = express();

    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use("/", indexRoute);
    app.use("/api/v1/product", await createProductRoutes());
    app.use("/api/v1/category", await createCategoryRoutes());

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

    return app;
};

export default createApp;
