const express = require('express');
const router = express.Router();
const session = require('express-session');

const maxAge = 1000 * 24 * 60 * 60; // 1 day

// session cookies
router.use(
  session({
    key: '_uid',
    genid: function () {
      return require('crypto').randomBytes(64).toString('hex');
    },
    secret: process.env.ACCESS_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge,
      httpOnly: false,
      path: '/',
      sameSite: 'none',
      secure: true,
    },
  })
);

module.exports = router;
