const {
  User
} = require('../../models');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  const {
    full_name,
    email,
    username,
    password,
    age,
    phone_number
  } = req.body;
  const hash = await bcrypt.hash(password, 10);
  //return console.log(User);
  await User.create({
    full_name,
    email,
    username,
    password: hash,
    age,
    phone_number
  }).then(result => {
    return res.status(201).json({
      status: 'success',
      message: 'Success register',
      user: result
    })
  }).catch(error => {
    return res.status(400).json({
      status: 'error',
      message: error.message
    });
  });
}