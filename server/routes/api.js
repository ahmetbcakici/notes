/* Packages I used */
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/* MongoDB Models */
import User from '../models/user/user';

const router = express.Router(); // call express.Router function to provide route

router.get('/', (req, res) => {
  res.send('Index Get Request');
});

// POST request for /register endpoint
router.post('/register', async (req, res) => {
  // get required fields to register from request body which has sent by client
  const {username, password, emailAddress} = req.body;

  // hash variable represents that hashed form for our plain password
  const hash = await bcrypt.hash(password, 10);

  // generate new user on db
  const userGenerated = await User.create({
    username,
    password: hash,
    emailAddress,
  });

  res.send(userGenerated._id);
});

// POST request for /login endpoint
router.post('/login', async (req, res) => {
  const {username, password} = req.body;

  // find user by username came from client
  const doc = await User.findOne({username});
  if (!doc) return res.status(400).send('User not found'); // there is no registered user with the username

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
    return res.send(verifyToken);
  } catch (error) {
    return res.status(401).send('Invalid Token!');
  }
});

// GET request for /note endpoint
router.get('/note', async (req, res) => {
  const {userID, noteID} = req.body;

  const doc = await User.findById(userID);

  const note = doc.notes.find((note) => note._id == noteID && note);

  res.send(note);
});

// POST request for /note endpoint
router.post('/note', async (req, res) => {
  const {userID, title, content} = req.body;

  const doc = await User.findById(userID);

  doc.notes.push({
    title,
    content,
  });

  doc.save();
});

// PATCH request for /note endpoint
router.patch('/note', async (req, res) => {
  const {userID, noteID, title, content} = req.body;

  const doc = await User.findById(userID);

  const note = doc.notes.find((note) => note._id == noteID && note);

  // update if there is new title or content data
  note.title = title ? title : note.title;
  note.content = content ? content : note.content;

  doc.save();

  res.send(note);
});

// DELETE request for /note endpoint
router.delete('/note', async (req, res) => {
  const {userID, noteID} = req.body;

  const doc = await User.findById(userID);

  const note = doc.notes.find((note) => note._id == noteID && note);

  note.remove();

  doc.save();

  res.send(note);
});

export default router;
