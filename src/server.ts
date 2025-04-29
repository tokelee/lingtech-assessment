import express from "express";
import errorHandler from "#middlewares/error_handler.middleware.js";
const app = express();

app.use(express.json());

import routes from "#routes/index.js";

app.use(routes);

const port = "5000";

app.use(errorHandler);

app.listen(port, () => {
    console.log(`App is running at http://127.0.0.1:${port}`);
});