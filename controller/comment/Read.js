const {Comment, User, Photo} = require('../../models')

module.exports = (req, res) => {
    Comment
    .findAll({
        include: [
            {
                model: Photo,
                attributes: ['id', 'title', 'caption', 'poster_image_url']
            },
            {
                model: User,
                attributes: ['id', 'username', 'profile_image_url', 'phone_number']
            }
        ]
    })
    .then(comments => {
        return res.status(200).json({
            comments
        })
    })
    .catch(error => {
        return res.status(400).json({
            status: 'error',
            message: error.message,
        })
    })
}