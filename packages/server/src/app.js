const express = require('express');
const mongoose = require("mongoose");

const apiRouter = require('./composer/api.composer');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 8080;

app.use(apiRouter);

const backendUrl = process.env.MONGO_ATLAS_URL;

const connectWithRetry = () =>
  mongoose.connect(
    backendUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.error(
          "Failed to connect to mongo on startup - retrying in 1 sec",
          err
        );
        setTimeout(connectWithRetry, 1000);
      }
    }
  );
connectWithRetry();

mongoose.connection.on("error", (e) => {
  console.error("Error connecting to MongoDB!");
  console.error(e);
});

mongoose.connection.on("open", () => {
  console.log("Connected successfuly to MongoDB!");
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
