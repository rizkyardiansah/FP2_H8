const {SocialMedia} = require('../../models');

module.exports = async (req, res) => {
  const { name,  social_media_url }  = req.body;
  const UserId                       = req.user.id;
  
  // if (parseInt(id) !== userId) {
  //   return res.status(401).json({
  //     status: "error",
  //     message: "user unauthorized"
  //   })
  // } else {
    
  // }
  //return console.log({name, social_media_url, UserId});
  await SocialMedia.create({
    name,
    social_media_url,
    UserId
  }).then(result => {
    //return console.log(result);
    let data = {
      id: result.id,
      name: result.name,
      social_media_url: result.social_media_url,
      UserId: result.UserId,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    }
    return res.status(201).json({
      status: 'success',
      message: 'success add data',
      social_media: data
    })
  }).catch(error => {
    // const err = error.err
    // const errorList = err.map(d => {
    //   let obj = {}
    //   obj[d.path] = d.message
    //   return obj;
    // })
    return res.status(400).json({
      status: 'error',
      message: error
    });
  })
  
}