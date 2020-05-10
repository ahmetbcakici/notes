import express from 'express';

import User from '../models/user/user';

const router = express.Router();

// GET request for /note endpoint
router.get('/', async (req, res) => {
  const {userID, noteID} = req.query;
  const {notes} = await User.findById(userID);
  const note = notes.id(noteID);
  res.send(note);
});

// GET request for /note/all endpoint which is returning all notes by user
router.get('/all', async (req, res) => {
  const {userID} = req.query;
  const {notes} = await User.findById(userID);
  res.send(notes);
});

// POST request for /note endpoint
router.post('/', async (req, res) => {
  const {userID} = req.body;
  const doc = await User.findById(userID);
  doc.notes.push({});
  doc.save();
  res.send(doc.notes);
});

// PATCH request for /note endpoint
router.patch('/', async (req, res) => {
  const {userID, noteID, title, content} = req.body;
  const doc = await User.findById(userID);
  const note = doc.notes.id(noteID);

  // update if there is new title or content data
  note.title = title ? title : note.title;
  note.content = content ? content : note.content;

  doc.save();
  res.send(doc.notes);
});

// DELETE request for /note endpoint
router.delete('/', async (req, res) => {
  const {userID, noteID} = req.body;
  const doc = await User.findById(userID);
  const {notes} = doc;
  if (notes.length > 1) {
    const note = notes.id(noteID);
    note.remove();
    doc.save();
  }
  res.send(notes);
});

export default router;
