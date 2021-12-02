const {Photo} = require('../../models')

module.exports = (req, res) => {
  const {poster_image_url, title, caption} = req.body
  const UserId = req.user.id

  //simpan data kedalam table photo
  Photo
  .create({
    title,
    caption,
    poster_image_url,
    UserId,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  .then(result => {
    //jika berhasil tampilkan response success
    return res.status(201).json({
      id: result.id,
      poster_image_url: result.poster_image_url,
      title: result.title,
      caption: result.caption,
      UserId: result.UserId,
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
};
