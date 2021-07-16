require('dotenv').config();

const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());

require('./auth');

const usersRouter = require('../users/controller/user-controller');
app.use('/users', usersRouter);

module.exports = app;
