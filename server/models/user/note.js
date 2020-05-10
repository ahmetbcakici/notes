import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  title: {
    type: String,
    default:'Note Title',
  },
  content:{
    type:String,
    default:'Take a note here..'
  }
});

export default NotesSchema
