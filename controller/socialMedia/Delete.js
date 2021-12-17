const {SocialMedia}   = require('../../models');

module.exports = async (req, res) => {
  const id = req.params.id;
  const UserId = req.user.id;

  await SocialMedia.findOne({
    where: {
      id: id
    }
  }).then(async pass => {
    if (pass === null) {
      return res.status(404).json({
        status: 'error',
        message: 'Social media not found'
      })
    } else {
      //return console.log(pass.id !== UserId);
      if (pass.UserId !== UserId) {
        return res.status(401).json({
          status: "error",
          message: "user unauthorized"
        })
      } else {
        await SocialMedia.destroy({
          where: {
            id: id
          }
        }).then(async result => {
          //return console.log(result);
          return res.status(200).json({
            message: 'Your social media has been successfully deleted'
          })

        }).catch(error => {
          return res.status(400).json({
            status: 'error',
            message: error.message
          });
        })
      }
    }
  })

}