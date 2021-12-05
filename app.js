require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/users");
const photosRouter = require("./routes/photos");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", router);

app.use("/api/photos", photosRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
