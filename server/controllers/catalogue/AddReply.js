import CATALOGUE_MODEL from "../../models/catalogue.js";
import COMMENT_MODEL from "../../models/comment.js"; // Import the Comment model

const AddReply = async (req, res) => {
  try {
    const {reply ,commentId,userId}= req.body;

    // Check if the comment exists
    const comment = await COMMENT_MODEL.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'comment not found' });
    }

    // Create a new comment using the Comment model
    const newComment = new COMMENT_MODEL({
      commentText: reply,
      commentBy: userId // Assuming userId is a valid ObjectId
    });

    // Save the new comment
    const savedComment = await newComment.save();
    comment.replies.push(savedComment._id);

    // Save the updated catalogue document
    await comment.save();

    return res.status(200).json({ message: "Reply added successfully" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export default AddReply;
