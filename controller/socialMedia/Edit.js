const {
  SocialMedia, User
} = require('../../models');

module.exports = async (req, res) => {
  const {
    name,
    social_media_url
  } = req.body;
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
        await SocialMedia.update({
          name,
          social_media_url,
          UserId
        }, {
          where: {
            id: id
          }
        }).then(async result => {
          //return console.log(result);
          await SocialMedia.findOne({
            where: {
              id: id
            },
            attributes: ['id', 'name', 'social_media_url', 'UserId', 'createdAt', 'updatedAt']
          }).then(rsl => {
            return res.status(200).json({
              social_media: rsl
            })
          }).catch(err => {
            return res.status(400).json({
              message: err.message
            })
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