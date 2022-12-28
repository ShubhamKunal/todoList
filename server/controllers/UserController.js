const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async function (req, res) {
  const { password, email } = req.body;
  const matched = await User.findOne({ email: email });
  if (matched === null) {
    return res.json({ message: "Please register first!" });
  }
  const passwordMatch = await bcrypt.compare(password, matched.password);
  if (!passwordMatch) {
    return res.json({ message: "Invalid Credentials" });
  }
  const access_token = jwt.sign(
    {
      ...matched,
    },
    process.env.SECRET_KEY
  );
  return res.json({ message: "Logged!", user: matched, token: access_token });
};

const register = async function (req, res) {
  const { username, password, email } = req.body;

  const matchedEmail = await User.findOne({ email: email });
  const matchedUsername = await User.findOne({ username: username });
  if (matchedEmail !== null || matchedUsername !== null) {
    return res.json({ message: "User Already Exists!" });
  }
  const hashedPassport = await bcrypt.hash(password, 10);
  User.create({
    username: username,
    password: hashedPassport,
    email: email,
  }).then(() => {
    const access_token = jwt.sign(
      {
        ...matchedEmail,
      },
      process.env.SECRET_KEY
    );
    return res.json({
      message: "Registered!",
      user: matched,
      token: access_token,
    });
  });
};

module.exports = { login, register };
