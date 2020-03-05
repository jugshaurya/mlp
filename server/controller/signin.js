const User = require("../models/user");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

// validation
const schema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .error(new Error("Password should be alphanumeric and at least 6 length"))
});

// signin controller
const signin = async (req, res, next) => {
  //  validate user input
  const { email, password } = req.body;
  const { error } = schema.validate({ email, password });
  if (error) {
    if (!error.details) return res.status(422).json({ error: error.message });
    return res.status(422).json({ error: error.details[0].message });
  }

  try {
    // check if email is there or not
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Email does not exist" });

    // Validate the password
    user.verifyPassword(password, async function(error, isEqual) {
      if (error)
        return res.status(500).json({ error: "Password Checking went wrong" });
      if (!isEqual)
        return res
          .status(400)
          .json({ error: "Password and Email does't Match" });

      // Credentials are correct now
      const token = await jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "7d"
        }
      );

      const { _id, username, name, role } = user;
      res.json({
        token: token,
        _id,
        username,
        name,
        email: user.email,
        role,
        message: `Welcome ${name}`
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "User Signin Error" });
  }
};

module.exports = signin;
