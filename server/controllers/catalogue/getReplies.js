import COMMENT_MODEL from "../../models/comment.js";

const GetRepliesByCommentId = async (req, res) => {
  try {
    const { commentId } = req.params;
    // Check if the catalogue exists
    const comment = await COMMENT_MODEL.findById(commentId).populate('replies');

    if (!comment) {
      return res.status(404).json({ error: 'Catalogue not found' });
    }

    // Extract comments from the catalogue
    const replies = comment.replies;
    console.log(replies);

    // Send comments as response
    return res.status(200).json({ replies });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export default GetRepliesByCommentId;
