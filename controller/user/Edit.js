const {
  User
} = require('../../models');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  const {
    full_name,
    email,
    username,
    age,
    phone_number
  } = req.body;
  const id = req.params.id;
  //return console.log(User);
  await User.update({
    full_name,
    email,
    username,
    age,
    phone_number
  }, {
    where: {
      id: id
    }
  }).then(result => {
    if (result == 1) {
      return res.status(200).json({
        status: 'success',
        message: 'Success changed',
        user: result
      })
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      })
    }
  }).catch(error => {
    return res.status(400).json({
      status: 'error',
      message: error
    })
  })
}