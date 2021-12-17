const {
  User
} = require('../../models');

module.exports = async (req, res) => {
  const id = req.params.id;
  const UserId = req.user.id;

  await User.findOne({
    where: {
      id: id
    }
  }).then(async rst => {
    //return console.log(rst);
    if (rst === null) {
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
      await User.destroy({
        where: {
          id: id
        }
      }).then(result => {
        //return console.log(result);  
        return res.status(200).json({
          message: 'Your account has been successfully deleted'
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
      message: error.message
    });
  })

}