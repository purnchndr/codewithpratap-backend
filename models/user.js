const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: [true, "Name can't be Empty"] },
  email: { type: String, required: [true, "Email can't be Empty"] },
  password: { type: String, required: [true, "Password can't be Empty"] },
  mobile: { type: String, required: [true, "Mobile Number can't be Empty"] },
  address: { type: String, required: [true, "Address can't be Empty"] },
  dob: { type: Date, required: [true, "Date of Birth can't be Empty"] },
  photo: { type: String },
  age: { type: Number },
  courses: [{ type: String }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
