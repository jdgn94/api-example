const mongoose = require('mongoose');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

exports.user_singup = (req, res, next) => {
  User.find({ email: req.body.email }).exec()
  .then(user => {
    if (user.length >= 1) return res.status(409).json({ message: "Mail exists" });
    
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err)  return res.status(500).json({ error: err });
      
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: hash
      });
      user.save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "User created"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
    });
  });
};

exports.user_login = (req, res, next) => {
  User.findOne({ email: req.body.email }).exec()
  .then(user => {
    if (!user) return res.status(401).json({ message: "Email or Password incorrect" });
    
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) return res.status(401).json({ message: "Email or Password incorrect" });
      
      if (result) {
        const token = jwt.sign({
          email: user.email,
          userId: user._id
        }, process.env.JWT_KEY, {
          expiresIn: "1h"
        })
        return res.status(200).json({
          message: "Authorized access",
          token: token
        });
      }
      
      return res.status(401).json({ message: "Email or Password incorrect" });
    })
  })
  .catch();
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};