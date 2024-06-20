import CATALOGUE_MODEL from "../../models/catalogue.js";
import COMMENT_MODEL from "../../models/comment.js";

const GetCommentsByCatalogueId = async (req, res) => {
  try {
    const { catalogueId } = req.params;
    // Check if the catalogue exists
    const catalogue = await CATALOGUE_MODEL.findById(catalogueId).populate('comments');

    if (!catalogue) {
      return res.status(404).json({ error: 'Catalogue not found' });
    }

    // Extract comments from the catalogue
    const comments = catalogue.comments;

    // Send comments as response
    return res.status(200).json({ comments });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export default GetCommentsByCatalogueId;
