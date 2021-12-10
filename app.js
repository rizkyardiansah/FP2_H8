
require('dotenv').config();
const express     = require('express');
const app         = express();
const port        = 3000;
const users       = require('./routes/users');
const socialmedia = require('./routes/socialMedia');
const photos      = require("./routes/photos");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', users)
app.use('/api/socialmedias', socialmedia)
app.use("/api/photos", photos);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
