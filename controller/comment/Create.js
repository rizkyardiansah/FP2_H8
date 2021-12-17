const {Photo, Comment} = require('../../models')

module.exports = (req, res) => {
    const {comment, PhotoId} = req.body
    const UserId = req.user.id

    Photo
    .findByPk(PhotoId)
    .then(photo => {
        //periksa apakah photo dengan id tersebut ada atau tidak
        //jika tidak ada, maka send respon not found
        if (photo === null) {
            return res.status(404).json({
                message: 'Photo not found',
            })
        }

        //jika photo dengan id tersebut ada
        //maka insert data comment
        Comment
        .create({
            UserId,
            PhotoId,
            comment,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        .then(result => {
            //jika proses insert berhasil
            //kirim response created
            return res.status(201).json({
                comment: {
                    id: result.id,
                    comment: result.comment,
                    UserId: result.UserId,
                    PhotoId: result.PhotoId,
                    updatedAt: result.updatedAt,
                    createdAt: result.createdAt,
                }
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
        //jika gagal tampilan respon error
        return res.status(400).json({
            status: 'error',
            message: error.message,
        })
    })
}