const router = require('express').Router();
const passport = require('passport');
const UserService = require('../service/UserService');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      image: req.body.image,
      role: 'user',
    };

    await UserService.createUser(user);

    res.status(201).end();
  } catch (error) {
    console.log(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await UserService.getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  };
});

router.put('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await UserService.updateUser(userId, req.body);

    res.status(204).end();
  } catch (error) {
    console.log(error);
  };
});

router.delete('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await UserService.deleteUser(userId);

    res.status(204).end();
  } catch (error) {
    console.log(error);
  };
});

router.post('/login', (req, res, next) => {
  passport.authenticate(
    'login',
    (err, user, info) => {
      try {
        if (err) {
          return next(err);
        }

        req.login(
          user,
          {session: false},
          (error) => {
            if (error) next(error);

            const body = {
              id: user.id,
              role: user.role,
            };

            const token = jwt.sign({user: body}, process.env.SECRET_KEY,
              {expiresIn: process.env.JWT_EXPIRATION});

            res.cookie('jwt', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
            });

            res.status(204).end();
          },
        );
      } catch (error) {
        next(error);
      }
    },
  )(req, res, next);
});

router.get('/logout', (req, res) => {
  try {
    res.clearCookie('jwt');
    res.status(204).end();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
