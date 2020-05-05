import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  content: String,
});

export default NotesSchema
