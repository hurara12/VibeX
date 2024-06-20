import COMMENT_MODEL from "../../models/comment.js";

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    
    // Find the comment and its replies
    const comment = await COMMENT_MODEL.findById(commentId);
    if (!comment) {
      return res.status(400).json({ success: false, message: "Comment not found" });
    }
    
    // Extract all reply IDs
    const replyIds = [...comment.replies, commentId];
    
    // Delete the comment and all its replies in one query
    await COMMENT_MODEL.deleteMany({ _id: { $in: replyIds } });

    res.status(200).json({ success: true, message: 'Comment and its replies deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export default deleteComment;
