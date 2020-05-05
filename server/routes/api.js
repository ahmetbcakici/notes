/* Packages I used */
import express from 'express';
import bcrypt from 'bcrypt';

/* MongoDB Models */
import User from '../models/user/user';

const router = express.Router(); // call express.Router function to provide route

router.get('/', (req, res) => {
  res.send('Index Get Request');
});

// POST request for /register endpoint
router.post('/register', async (req, res) => {
  // get required fields to register from request body which has sent by client
  const {
    name,
    surname,
    username,
    password,
    phoneNumber,
    emailAddress,
  } = req.body;

  // hash variable represents that hashed form for our plain password
  const hash = await bcrypt.hash(password, 10);

  // generate new user on db
  const userGenerated = await User.create({
    name,
    surname,
    username,
    password: hash,
    phoneNumber,
    emailAddress,
  });

  res.send(userGenerated._id);
});

// POST request for /login endpoint
router.post('/login', async (req, res) => {
  const {username, password} = req.body;

  // find user by username came from client
  const doc = await User.findOne({username});

  // compare operation between hashed password and plain text password came from client
  const match = await bcrypt.compare(password, doc.password);

  // if matches login success
  if (match) return res.send(doc._id);
});

export default router;