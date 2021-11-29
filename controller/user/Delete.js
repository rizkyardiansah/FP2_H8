const {User} = require('../../models');

module.exports = async (req, res) => {
  const id = req.params.id;

  await User.destroy({
    where: {
      id: id
    }
  }).then(result => {
    return res.status(200).json({
      status: 'success',
      message: 'Your account has been succescfully deleted'
    })
  }).catch(err => {
    return res.status(400).json({
      status: 'error',
      message: err.message
    })
  })
}