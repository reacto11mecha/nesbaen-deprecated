const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((db) => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });
