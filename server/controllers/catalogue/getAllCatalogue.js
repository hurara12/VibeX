import CATALOGUE_MODEL from "../../models/catalogue.js";

const getAllCatalogue = async (req, res) => {
  try {
    // Query the database to fetch all catalogue entries
    let catalogues = await CATALOGUE_MODEL.find({}).populate('uploadedBy');
    catalogues = catalogues.reverse();

    // Send the fetched catalogue entries as a response
    res.status(200).json(catalogues);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export default getAllCatalogue;
