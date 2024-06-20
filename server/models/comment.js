import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  commentText: { type: String, required: true },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comment_date: { type: Date, default: Date.now },
  edit_date: { type: Date, default: Date.now },
  commentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
