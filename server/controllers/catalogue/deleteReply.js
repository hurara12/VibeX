import CATALOGUE_MODEL from "../../models/catalogue.js";
import COMMENT_MODEL from "../../models/comment.js";

const deleteReply = async (req, res) => {
  try {
    const { replyId } = req.body;
    await COMMENT_MODEL.updateMany(
      { replies: replyId },
      { $pull: { replies: replyId } }
    );
    
    await COMMENT_MODEL.findByIdAndDelete(replyId);

    res.status(200).json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export default deleteReply;
