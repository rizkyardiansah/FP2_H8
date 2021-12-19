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
  await User.findOne({
    where: {
      id: id
    }
  }).then(async rst => {
    //return console.log(rst);
    if(rst === null) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      })
    }

    if (rst.id !== UserId) {
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
      }).then(async result => {
        //return console.log(result);  
          await User.findOne({
            where: {
              id: id
            },
            attributes: ['fullname', 'email', 'username', 'profile_image_url', 'age', 'phone_number']
          }).then(rsl => {
            return res.status(200).json({
              user: rsl
            })
          }).catch(err => {
            return res.status(400).json({
              message: err.message
            })
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
      })
    }
  }).catch(error => {
    return res.status(400).json({
      status: 'error',
      message: error
    });
  })

}