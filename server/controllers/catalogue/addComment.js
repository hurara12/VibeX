import CATALOGUE_MODEL from "../../models/catalogue.js";
import COMMENT_MODEL from "../../models/comment.js"; // Import the Comment model

const AddComment = async (req, res) => {
  try {
    const { catalogueId, comment, userId } = req.body;

    // Check if the catalogue exists
    const catalogue = await CATALOGUE_MODEL.findById(catalogueId);
    if (!catalogue) {
      return res.status(404).json({ error: 'Catalogue not found' });
    }

    // Create a new comment using the Comment model
    const newComment = new COMMENT_MODEL({
      commentText: comment,
      commentBy: userId // Assuming userId is a valid ObjectId
    });

    // Save the new comment
    const savedComment = await newComment.save();

    // Push the saved comment's ObjectId to the comments array in the catalogue document
    catalogue.comments.push(savedComment._id);

    // Save the updated catalogue document
    await catalogue.save();

    return res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export default AddComment;
