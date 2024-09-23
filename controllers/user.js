const User = require('../models/user');
const { catchAsync } = require('../errors/error');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const AppError = require('../errors/appError');

// const register = async (req, res, next) => {
//   const { mobile, email, password } = req.body;
//   let user = await User.findOne({ $or: [{ email }, { mobile }] });
//   if (user)
//     return res
//       .status(401)
//       .json({ message: 'user already registered', result: false });
//   const pass = await bcrypt.hash(password, 10);
//   const userdata = { ...req.body, password: pass };
//   user = await User.create(userdata);
//   const token = jwt.sign({ token: user._id }, process.env.JWT_SECRETE);

//   res.send({ data: user, result: true, message: 'User created', token });
// };

// const login = async (req, res, next) => {
//   const { mobile, password } = req.body;
//   if (!mobile || !password)
//     return res
//       .status(401)
//       .json({ message: 'Email and Password required', result: false });
//   let user = await User.findOne({ mobile });
//   if (!user) throw new AppError(401, 'Incorrect Mobile Number or Password');
//   // return res
//   //   .status(401)
//   //   .json({ message: 'Incorrect Mobile Number or Password', result: false });
//   const pass = await bcrypt.compare(password, user.password);
//   const token = jwt.sign({ token: user._id }, process.env.JWT_SECRETE);
//   if (!pass) throw AppError(401, 'Incorrect Mobile Number or Password');
//   res.status(200).json({
//     message: 'loggedin successful',
//     token,
//     result: true,
//     data: user,
//   });

//   // return res
//   //   .status(401)
//   //   .json({ message: 'Incorrect Mobile Number or Password', result: false });
// };

const profile = catchAsync(async (req, res, next) => {
  if (!req.user) throw new AppError(404, 'Invalid User ID');
  res.status(200).json({
    message: 'User Fetched Successfully',
    user: req.user,
    result: true,
  });
});

const addCourse = catchAsync(async (req, res, next) => {
  if (!req.user) throw new AppError(404, 'Invalid User ID');
  const course = req.body.course;
  if (!course) throw new AppError(401, 'Invalid course ID');
  const courses = [...req.user.courses, course];
  console.log(course, req.user._id);
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { courses },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    message: 'Course Purchase Successful',
    user: user,
    result: true,
  });
});

module.exports = { profile, addCourse };
