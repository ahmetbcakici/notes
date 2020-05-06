import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
});

export default NotesSchema
