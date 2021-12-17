const {SocialMedia, User} = require('../../models');

module.exports = async (req, res) => {
  const UserId = req.user.id;

  await SocialMedia.findAll({
    where: {
      UserId
    },
    include: [
      {
        model: User,
        attributes: ['id', 'username', 'profile_image_url']
      }
    ]
  }).then(result => {
    return res.status(200).json({
      social_medias: result
    })
  }).catch(err => {
    return res.status(400).json({
      status: 'error',
      message: err.message
    })
  })

}