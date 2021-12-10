const {
  User
} = require('../../models');

module.exports = async (req, res) => {
  const {
    full_name,
    email,
    username,
    profile_image_url,
    age,
    phone_number
  } = req.body;
  const id = req.params.id;
  const UserId = req.user.id;
  // return res.json({
  //   id, UserId
  // })
  //return console.log(User);
  if (parseInt(id) !== UserId) {
    return res.status(401).json({
      status: "error",
      message: "user unauthorized"
    })
  } else {
    await User.update({
      full_name,
      email,
      username,
      profile_image_url,
      age,
      phone_number
    }, {
      where: {
        id: id
      }
    }).then(result => {
      //return console.log(result);  
      if (result == 1) {
        res.status(200).json({
          status: 'success',
          message: 'Success changed',
          user: req.body
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

}