const {SocialMedia}   = require('../../models');

module.exports = async (req, res) => {
  const id = req.params.id;
  const UserId = req.user.id;

  if (parseInt(id) !== UserId) {
    return res.status(401).json({
      status: "error",
      message: "user unauthorized"
    })
  } else {
    await SocialMedia.destroy({
      where: {
        id: id
      }
    }).then(result => {
      if (result == 1) {
        return res.status(200).json({
          message: 'Your social media has been succescfully deleted'
        })
      } else {
        return res.status(404).json({
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