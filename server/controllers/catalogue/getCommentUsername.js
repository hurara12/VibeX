import CATALOGUE_MODEL from "../../models/catalogue.js";
import COMMENT_MODEL from "../../models/comment.js";

const GetCommentUsername = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Check if the comment exists
    const comment = await COMMENT_MODEL.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Populate the commentBy field
    await comment.populate('commentBy') 

    // Extract the populated commentBy details
    const userDetails = comment.commentBy;

    // Send userDetails as response
    return res.status(200).json(userDetails);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export default GetCommentUsername;
