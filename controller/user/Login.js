const {
  User
} = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
  JWT_SECRET_KEY
} = process.env;

module.exports = async (req, res) => {
  const {
    email,
    password
  } = req.body;

  await User.findOne({
    where: {
      email
    }
  }).then(async result => {
    //return console.log(result);
    if (result === null) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      })
    } else {
      const data = {
        id: result.id,
        email: result.email,
        password: result.password
      }
      // return console.log(data);
      // console.log(result, bcrypt.compareSync(password, result.password));
      //console.log(result[0].password);
      await bcrypt.compare(password, result.password, async function (err, passed) {
        // console.log(passed, err);
        // return res.json(result[0])
        if (passed) {
          let token = await jwt.sign(data, JWT_SECRET_KEY, {
            expiresIn: '1h'
          });
          return res.status(200).json({
            token
          })
        } else {
          return res.status(401).json({
            status: 'error',
            message: 'password is wrong'
          });
        }
      })
    }

  }).catch(error => {
    return res.status(400).json({
      status: 'error',
      message: error.message
    })
  })
}