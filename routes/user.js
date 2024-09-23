const express = require('express');
const { profile, addCourse } = require('../controllers/user');
const { auth, register, login } = require('../controllers/auth');

const route = express.Router();

route
  .get('/', auth, profile)
  .post('/register', register)
  .post('/login', login)
  .post('/purchase', auth, addCourse);

module.exports = route;
