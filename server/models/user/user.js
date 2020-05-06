import mongoose from 'mongoose';
import NotesSchema from './notes';
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
  notes: [NotesSchema],
});

export default mongoose.model('user', UserSchema);