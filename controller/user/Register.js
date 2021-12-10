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
    profile_image_url,
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
    profile_image_url,
    age,
    phone_number
  }).then(result => {
    let data = {
      full_name : result.full_name,
      email: result.email,
      username : result.email,
      profile_image_url : result.profile_image_url,
      age : result.age,
      phone_number : result.phone_number
    }
    return res.status(201).json({
      status: 'success',
      message: 'Success register',
      user: data
    })
  }).catch(error => {
    const err = error.errors
    const errorList = err.map(d => {
      let obj = {}
      obj[d.path] = d.message
      return obj;
    })
    return res.status(400).json({
      status: 'error',
      message: errorList
    });
  });
}