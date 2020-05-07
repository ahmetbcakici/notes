import express from 'express';

import User from '../models/user/user';

const router = express.Router();

// GET request for /note endpoint
router.get('/', async (req, res) => {
  const {userID, noteID} = req.query;
  const doc = await User.findById(userID);
  const note = doc.notes.find((note) => note._id == noteID && note);
  res.send(note);
});

// POST request for /note endpoint
router.post('/', async (req, res) => {
  const {userID, title} = req.body;
  const doc = await User.findById(userID);
  doc.notes.push({
    title,
  });
  doc.save();
  res.send();
});

// PATCH request for /note endpoint
router.patch('/', async (req, res) => {
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
router.delete('/', async (req, res) => {
  const {userID, noteID} = req.body;
  const doc = await User.findById(userID);
  const note = doc.notes.find((note) => note._id == noteID && note);
  note.remove();
  doc.save();
  res.send();
});

export default router;
