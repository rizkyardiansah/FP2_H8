require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes/users');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/users', router)

app.listen(port, () => {
  console.log(`Running on port ${port}`);
})