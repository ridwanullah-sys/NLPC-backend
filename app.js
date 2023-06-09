const express = require("express");
const employeeRouter = require("./router/employeeRoutes");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());

app.use("/employer", employeeRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to MondoDb and listening on port",
        process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

// module.exports.handler = serverless(app);
