const Joi = require("@hapi/joi");
const User = require("../models/user");

// validation
const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  name: Joi.string()
    .alphanum()
    .min(3)
    .max(50)
    .required(),

  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
});

// signup controller
const signup = async (req, res, next) => {
  const { username, name, email, password } = req.body;
  const userObj = { username, name, email, password };

  // 1. Validate user input
  const { error } = schema.validate(userObj);
  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }

  // 2. save the user data in database if email does ot exist in db
  try {
    const user = await User.findOne({ email: email });
    if (user) return res.status(422).send("User already Available");

    // user is new user
    const newUser = new User({
      ...userObj,
      profile: `${process.env.CLIENT_URL}/profile/${username}`
    });
    await newUser.save();
    res.status(201).json({ message: "User Created Succesfully" });
  } catch (error) {
    res.status(500).json({ error: "User Creation Error" });
  }
};

module.exports = signup;
