import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user/user';

const router = express.Router();

// POST request for /register endpoint
router.post('/register', async (req, res) => {
  // get required fields to register from request body which has sent by client
  const {username, password, emailAddress} = req.body;

  // hash variable represents that hashed form for our plain password
  const hash = await bcrypt.hash(password, 10);

  // generate new user on db
  try {
    await User.create({
      username,
      password: hash,
      emailAddress,
    });

    return res.send();
  } catch ({code}) {
    if (code === 11000) return res.status(401).send('This username or e-mail already registered!');
  }

  /* console.log(userGenerated) */

  //res.send(userGenerated._id);
});

// POST request for /login endpoint
router.post('/login', async (req, res) => {
  const {username, password} = req.body;

  // find user by username came from client
  const doc = await User.findOne({username});
  if (!doc) return res.status(404).send('User not found'); // there is no registered user with the username

  // compare operation between hashed password and plain text password came from client
  const match = await bcrypt.compare(password, doc.password);

  // password incorrect
  if (!match) return res.status(401).send('Password is incorrect!');

  // login success
  if (match) {
    //return res.send(doc);
    const token = await jwt.sign({user: doc}, process.env.JWT_SECRET_KEY);
    return res.json({doc, token});
  }
});

// POST request for /auth endpoint
router.post('/auth', async (req, res) => {
  const {token} = req.body;

  try {
    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const doc = await User.findById(verifyToken.user._id);
    return res.send(doc);
  } catch (error) {
    return res.status(401).send('Invalid Token!');
  }
});

// GET request for /user endpoint
router.get('/:id', async (req, res) => {
  const userID = req.params.id;
  const doc = await User.findById(userID);
  res.send(doc);
});

export default router;
