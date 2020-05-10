import mongoose from 'mongoose';
import NotesSchema from './note';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  notes: {
    type:[NotesSchema],
    default:{title:'Sample Note',content:'This is a sample note!'}
  },
});

export default mongoose.model('user', UserSchema);