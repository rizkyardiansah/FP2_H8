const {Comment} = require('../../models')

module.exports = (req, res) => {
    const CommentId = req.params.commentId
    const UserId = req.user.id

    Comment
    .findByPk(CommentId)
    .then(comment => {
        //periksa apakah comment dengan id tersebut ada
        //jika tidak ada, maka tampilkan error not found
        if (comment === null) {
            return res.status(404).json({
                message: 'Comment not found',
            })
        }

        //periksa apakah user merupakan pemiliki comment ini
        //jika bukan, maka tampilkan error forbidden
        if (comment.UserId != UserId) {
            return res.status(403).json({
                message: 'User not authorized',
            })
        }

        //hapus comment
        comment
        .destroy()
        .then(result => {
            return res.status(200).json({
                message: 'Your comment has been successfully deleted',
            })
        })
        .catch(error => {
            //jika terjadi error, tampilkan respon error
            return res.status(400).json({
                status: 'error',
                message: error.message,
            });
        })
    })
    .catch(error => {
        //jika terjadi error
        return res.status(400).json({
            status: 'error',
            message: error.message,
        })
    })
}