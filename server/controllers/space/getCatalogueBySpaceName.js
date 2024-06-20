import CATALOGUE_MODEL from "../../models/catalogue.js";

const getCatalogueBySpaceName = async (req, res) => {
  let { spaceName } = req.params;
  let spacename = spaceName.toLowerCase();

  try {
    // Query the database to fetch catalogue entries for the specified spaceName
    const catalogues = await CATALOGUE_MODEL.find({ space: spacename }).populate('uploadedBy');
    const totalCatalogues = await CATALOGUE_MODEL.countDocuments({ space: spacename });


    // Send the fetched catalogue entries as a response
    res.status(200).json({ catalogues, totalCatalogues });
  } catch (error) {

    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export default getCatalogueBySpaceName;
