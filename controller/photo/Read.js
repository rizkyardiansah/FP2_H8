const { Photo, User, Comment } = require('../../models')

module.exports = (req, res) => {
    Photo.findAll({
        //lakukan eiger loading
        include: [
            //ambil attribute id, username dan profile_image_url
            //dari table User
            {
                model: Comment,
                attributes: ['comment'],
                include: [{
                    model: User,
                    attributes: ['username']
                }]
            },
            {
                model: User,
                attributes: ['id', 'username', 'profile_image_url']
            },
        ]
    })
    .then(photos => {
        //jika berhasil tampilkan pesan sukses
        return res.status(200).json({photos})
    })
    .catch(error => {
        //jika gagal maka tampilkan pesan error
        return res.status(500).json({
            error: 'error',
            message: error.message
        })
    })
}