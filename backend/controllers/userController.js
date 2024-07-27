const User = require('../models/user');
const bcrypt = require('bcrypt'); //pa criptar a password
const jwt = require('jsonwebtoken'); //  atribuir um token a password

exports.signup = (req, res, next) => {
  console.log(req.body.email)
  console.log(req.body.firstName)
  console.log(req.body.lastName)
  console.log(req.body.birthDate)
  console.log(req.body.password)

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate
      });

      user.save()//save- p guardar na base de dados
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'email incorrecte' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ message: 'password incorrecte' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
    })
    .catch(error => { res.status(500).json({ error }) });
};