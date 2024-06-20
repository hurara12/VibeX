import CATALOGUE_MODEL from "../../models/catalogue.js";

const getAllSpacesData = async (req, res) => {
    try {
        // Aggregate the count of catalogues for each space
        const catalogueCounts = await CATALOGUE_MODEL.aggregate([
            {
                $sort: { space: 1 } // Sort by the "space" field in ascending order like "A,B,C"
            },
            {
                $group: {
                    _id: "$space", // Group by space name
                    totalCatalogues: { $sum: 1 } // Count the number of catalogues in each group
                }
            }
        ]);

        // Send the aggregated data as a response
        res.status(200).json(catalogueCounts);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export default getAllSpacesData;
