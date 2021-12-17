const { Photo } = require('../../models')

module.exports = (req, res) => {
    const { title, caption, poster_image_url } = req.body
    const { photoId } = req.params
    const userId = req.user.id

    //cari foto dengan id tersebut
    Photo
    .findOne({
        where: { 
            id: photoId 
        }
    })
    .then(photo => {
        //jika foto dengan id tersebut tidak ditemukan
        //kirim respon not found
        if (photo === null) {
            return res.status(404).json({
                message: 'Photo not found',
            })
        }

        //jika photo tersebut bukan milik user
        //maka tampilkan respon forbidden
        if (photo.UserId != userId) {
            return res.status(403).json({
                message: 'User unauthorized'
            })
        }

        //jika foto dengan id tersebut ditemukan
        //ganti data foto dengan yang baru
        photo.set({
            title,
            caption,
            poster_image_url,
            updatedAt: new Date(),
        })
        
        //save data foto baru
        photo
        .save()
        .then(result => {
            //jika sukses tampilkan respon sukses
            return res.status(200).json({
                photo: result
            })
        })
        .catch(error => {
            //jika gagal tampilkan respon error
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

    })
    .catch(error => {
        return res.status(400).json({
            status: 'error',
            message: error.message,
        })
    })

}