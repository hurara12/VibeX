import CATALOGUE_MODEL from "../../models/catalogue.js";

const likeCatalogue = async (req, res) => {
  try {
    const catalogueId=req?.body?.catalogueId;
    const userId=req?.body?.userId;

    const catalogue = await CATALOGUE_MODEL.findOne({ _id: catalogueId });

    if (!catalogue || !userId) {
      return res.status(404).json({ error: 'Catalogue not found' });
    }

    const likedByCurrentUser = catalogue.likes.includes(userId);

    if (likedByCurrentUser) {
        const index = catalogue.likes.indexOf(userId);
        if (index !== -1) {
            catalogue.likes.splice(index, 1);
        }
    } else {
        catalogue.likes.push(userId);
    }
    await catalogue.save();

    return res.status(200).json({message: "Retrived"});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export default likeCatalogue;
