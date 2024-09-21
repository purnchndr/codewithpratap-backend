const User = require('../models/user');
const { catchAsync } = require('../errors/error');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
  const { mobile, email, password } = req.body;
  let user = await User.findOne({ $or: [{ email }, { mobile }] });
  if (user)
    return res
      .status(401)
      .json({ message: 'user already registered', result: false });
  const pass = await bcrypt.hash(password, 10);
  const userdata = { ...req.body, password: pass };
  user = await User.create(userdata);
  const token = jwt.sign({ token: user._id }, process.env.JWT_SECRETE);

  res.send({ data: user, result: true, message: 'User created', token });
};

const login = async (req, res, next) => {
  const { mobile, password } = req.body;
  if (!mobile || !password)
    return res
      .status(401)
      .json({ message: 'Email and Password required', result: false });
  let user = await User.findOne({ mobile });
  if (!user)
    return res
      .status(401)
      .json({ message: 'Incorrect Mobile Number or Password', result: false });
  const pass = await bcrypt.compare(password, user.password);
  const token = jwt.sign({ token: user._id }, process.env.JWT_SECRETE);
  if (pass)
    return res
      .status(200)
      .json({ message: 'loggedin successful', token, result: true });

  return res
    .status(401)
    .json({ message: 'Incorrect Mobile Number or Password', result: false });
};

const profile = async (req, res, next) => {
  res.status(200).json({ message: 'Welcome abroad', result: true });
};

module.exports = { register, login, profile };
