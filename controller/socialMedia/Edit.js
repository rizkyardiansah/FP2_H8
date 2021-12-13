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

  if (parseInt(id) !== UserId) {
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
        attributes: ['id', 'name', 'social_media_url', 'UserId', 'createdAt', 'updatedAt'],
        include: [{
          model: User,
          attributes: ['id', 'username', 'profile_image_url']
        }]
      }).then(rsl => {
        return res.status(200).json({
          social_media: rsl
        })
      }).catch(err => {
        return res.status(400).json({
          message: err.message
        })
      })

      // if (result == 1) {
      //   res.status(200).json({
      //     status: 'success',
      //     message: 'Success changed',
      //     social_media: data
      //   })
      // } else {
      //   return res.status(404).json({
      //     status: 'error',
      //     message: 'Social media not found'
      //   })
      // }

    }).catch(error => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    })
  }

}