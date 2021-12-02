module.exports = (req, res, next) => {
    const {poster_image_url, title, caption} = req.body
    
    if (poster_image_url === undefined) {
        return res.status(400).json({
            status: 'error',
            message: 'Poster_image_url tidak boleh kosong',
        })
    }

    if (title === undefined) {
        return res.status(400).json({
            status: 'error',
            message: 'Judul tidak boleh kosong',
        })
    }

    if (caption === undefined) {
        return res.status(400).json({
            status: 'error',
            message: 'Caption tidak boleh kosong',
        })
    }

    return next()
}