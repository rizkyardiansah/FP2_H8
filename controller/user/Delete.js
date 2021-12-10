const {
  User
} = require('../../models');

module.exports = async (req, res) => {
  const id = req.params.id;
  const UserId = req.user.id;

  if (parseInt(id) !== UserId) {
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
      if (result == 1) {
        return res.status(200).json({
          status: 'success',
          message: 'Your account has been succescfully deleted'
        })

      } else {
        return res.status(404).json({
          status: 'error',
          message: 'User not found'
        })
      }

    }).catch(err => {
      return res.status(400).json({
        status: 'error',
        message: err.message
      })
    })
  }

}