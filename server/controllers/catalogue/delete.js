import CATALOGUE_MODEL from "../../models/catalogue.js";
import COMMENT_MODEL from "../../models/comment.js";

const deleteCatalogue = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the catalogue by its ID
    const catalogue = await CATALOGUE_MODEL.findById(id);
    if (!catalogue) {
      return res.status(400).json({ success: false, message: 'Catalogue not found' });
    }

    // Delete all comments and their replies associated with the catalogue
    for (const commentId of catalogue.comments) {
      // Find the comment by its ID
      const comment = await COMMENT_MODEL.findById(commentId);
      if (!comment) {
        continue; // Skip if comment not found
      }

      // Delete all replies associated with the comment
      for (const replyId of comment.replies) {
        await COMMENT_MODEL.findByIdAndDelete(replyId);
      }

      // Delete the comment itself
      await COMMENT_MODEL.findByIdAndDelete(commentId);
    }

    // Finally, delete the catalogue itself
    await CATALOGUE_MODEL.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Catalogue and associated comments deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export default deleteCatalogue;
