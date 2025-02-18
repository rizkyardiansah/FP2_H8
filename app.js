
require('dotenv').config();
const express     = require('express');
const app         = express();
const users       = require('./routes/users');
const socialmedia = require('./routes/socialMedia');
const photos      = require("./routes/photos");
const comments    = require('./routes/comments')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', users)
app.use('/api/socialmedias', socialmedia)
app.use("/api/photos", photos);
app.use('/api/comments', comments)

module.exports = app