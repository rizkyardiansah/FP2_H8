const { Photo } = require('../../models')

module.exports = (req, res) => {
    const { photoId } = req.params
    const userId = req.user.id

    //periksa apakah foto dengan id tersebut ada
    Photo
    .findOne({
        where: {
            id: photoId,
        },
    })
    .then(photo => {
        //jika foto dengan id tersebut tidak ada
        //maka tampilkan respon not found
        if (photo === null) {
            return res.status(404).json({
                message: 'Photo not found',
            })
        }

        //jika UserId pada photo tidak sama dengan userId dari JWT
        //maka tampilkan respon unauthorized
        if (photo.UserId != userId) {
            return res.status(403).json({
                message: 'User unauthorized',
            })
        }

        //jika photo dengan id tersebut ada
        //maka hapus photo
        photo
        .destroy()
        .then(result => {
            //jika berhasil tampilkan respon sukses
            return res.status(200).json({
                message: 'Your photo has been successfully deleted',
            })
        })
        .catch(error => {
            //jika gagal maka tampilkan pesan error
            return res.status(500).json({
                error: 'error',
                message: error.message
            })
        })

    })
    .catch(error => {
        //tampilkan error
        return res.status(500).json({
            error: 'error',
            message: error.message,
        })
    })

}