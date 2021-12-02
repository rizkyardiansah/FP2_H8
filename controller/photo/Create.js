const {Photo} = require('../../models')

module.exports = (req, res) => {
  const {poster_image_url, title, caption} = req.body
  const UserId = req.user.id

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
    return res.status(201).json({
      id: result.id,
      poster_image_url: result.poster_image_url,
      title: result.title,
      caption: result.caption,
      UserId: result.UserId,
    })
  })
  .catch(error => {
    console.log(error)
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
