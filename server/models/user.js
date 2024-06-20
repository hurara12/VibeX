import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    default: null,
  },
  profilepicture: {
    type: String,
  },
  subscribe: {
    type: Boolean,
    default: false,
  },
  rollnum: {
    type: String,
  },
  usertype: {
    type: String,
    enum: ['user','student', 'admin','member'],
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
