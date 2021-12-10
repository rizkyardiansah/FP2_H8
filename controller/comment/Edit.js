const {Comment} = require('../../models')

module.exports = (req, res) => {
    const newComment = req.body.comment
    const UserId = req.user.id
    const CommentId = req.params.commentId

    Comment
    .findByPk(CommentId)
    .then(comment => {
        //jika komen dengan id tidak ditemukan
        //maka kirim respon not found
        if (comment === null) {
            return res.status(404).json({
                status: 'Not Found',
                message: 'Comment not found',
            })
        }

        //periksa apakah user merupakan pemilik komen ini
        //jika bukan maka tampilkan error not authorized
        if (comment.UserId != UserId) {
            return res.status(403).json({
                status: 'Forbidden',
                message: 'User not authorized',
            })
        }

        //simpan komen baru ke database
        comment.set({
            comment: newComment,
            updatedAt: new Date(),
        })

        //simpan perubahan 
        comment
        .save()
        .then(result => {
            //jika berhasil menyimpan perubahan
            //kirim respon success
            return res.status(200).json({
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
            //jika terjadi error, tampilkan respon error
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
            message: error.message
        })
    })
}