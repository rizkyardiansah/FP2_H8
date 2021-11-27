const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {JWT_SECRET_KEY} = process.env;

module.exports = async (req, res) => {
  const { email, password } = req.body;
  
  await User.findAll({
    where: {
      email, password
    }
  }).then(result => {
    const isValidPassword =  bcrypt.compareSync(password, result.password)
    if (isValidPassword) {
      let token = jwt.sign(data, JWT_SECRET_KEY, {
        expiresIn: '1h'
      })
      return res.status(200).json({
        message: 'success login',
        token
      })
    } else {
      return res.status(401).json({
        status: 'error',
        message: 'password is wrong'
      });
    }

  }).catch(error => {
    return res.status(400).json({
      status: 'error',
      message: error.message
    })
  })
}