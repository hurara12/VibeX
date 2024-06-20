import cloudinaryUpload from "../../utils/cloudinaryUploadFiles.js";
import jwt from "jsonwebtoken";
import USER_MODEL from "../../models/user.js";
import CATALOGUE_MODEL from "../../models/catalogue.js";

const addCatalogue = async (req, res) => {
  try {
    // Get user information from the decoded token
    const token = req.headers['authorization'].split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await USER_MODEL.findOne({ email_id: decoded.email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if req.body.images is an array
    if (!Array.isArray(req.body.images)) {
      return res.status(400).json({ error: 'Invalid images data' });
    }

    // Upload images to Cloudinary in parallel
    const uploadLinks = await Promise.all(
      req.body.images.map(async (image) => {
        try {
          const link = await cloudinaryUpload(image);
          return {
            image_url: link,
            memoryNote: "",
            privacy: "public"
          };
        } catch (error) {
          console.error('Error uploading image:', error);
          throw error; // Propagate the error
        }
      })
    );

    // Create a new Catalogue entry
    const newCatalogue = new CATALOGUE_MODEL({
      title:req.body.title,
      description: req.body.description,
      space: req.body.space,
      images: uploadLinks,
      uploadedBy: user._id,
      likes: [],
      comments: [],
    });

    // Save the new Catalogue entry to the database
    const savedCatalogue = await newCatalogue.save();

    res.status(201).json(savedCatalogue);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export default addCatalogue;
