const User = require("../models/user");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

// validation
const schema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
});

// signin controller
const signin = async (req, res, next) => {
  //  validate user input
  const { email, password } = req.body;
  const { error } = schema.validate({ email, password });
  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }

  try {
    // check if email is there or not
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email does not exist" });

    // Validate the password
    user.verifyPassword(password, async function(error, isEqual) {
      if (error)
        return res
          .status(500)
          .json({ message: "Password Checking went wrong" });
      if (!isEqual)
        return res
          .status(400)
          .json({ message: "Password and Email does't Match" });

      // Credentials are correct now
      const token = await jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "7d"
        }
      );

      res.cookie("token", token, { expiresIn: "7d" });
      const { _id, username, name, role } = user;
      const emaill = user.email;
      res.send({
        token: token,
        user: { _id, username, name, emaill, role },
        message: `Welcome ${name}`
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "User Signin Error" });
  }
};

module.exports = signin;
