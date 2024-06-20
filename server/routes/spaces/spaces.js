import express from "express";
const router=express.Router();
import getCatalogueBySpaceName from "../../controllers/space/getCatalogueBySpaceName.js";
import getAllSpacesData from "../../controllers/space/getAllSpacesData.js";

router.get('/SpecificCatalogue/:spaceName', getCatalogueBySpaceName);
router.get('/getAllSpacesCount',getAllSpacesData);
export default router;