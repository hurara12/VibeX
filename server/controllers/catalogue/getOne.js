import CATALOGUE_MODEL from "../../models/catalogue.js";

const getOneCatalogue = async (req, res) => {
  try {
    const { catalogueId } = req.params;
    
    const catalogue = await CATALOGUE_MODEL.findOne({ _id: catalogueId });

    if (!catalogue) {
      return res.status(404).json({ error: 'Catalogue not found' });
    }
    res.status(200).json(catalogue);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export default getOneCatalogue;
