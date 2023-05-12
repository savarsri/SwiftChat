const User = require("../models/user");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  let email = req.body.email;
  const exists = await User.exists({ email });
  if (exists) {
    res.status(200).json({
      code: 404,
      message: "User already exists",
    });
  } else {
    bcrypt.hash(req.body.password, process.env.SALT , function (err, hashedPass) {
      if (err) {
        res.json({
          error: err,
        });
      }
      let user = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        password: hashedPass,
      });
      user
        .save()
        .then((user) => {
          res.status(200).json({
            code: 200,
            message: "user added successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            code: 500,
            error,
            message: "error occured",
          });
        });
    });
  }
};


module.exports = {register}