import mongoose from 'mongoose';
import NotesSchema from './notes';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    /* required: true, should it be? */
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  notes: [NotesSchema],
  /* group */
});

export default mongoose.model('user', UserSchema);