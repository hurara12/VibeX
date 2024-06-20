import express from "express";
import upload from "../../utils/multerUpload.js";
import addCatalogue from "../../controllers/catalogue/add.js";
import getCatalogue from "../../controllers/catalogue/get.js";
import deleteCatalogue from "../../controllers/catalogue/delete.js";
import likeCatalogue from "../../controllers/catalogue/like.js";
import getOneCatalogue from "../../controllers/catalogue/getOne.js";
import AddComment from "../../controllers/catalogue/addComment.js";
import GetCommentsByCatalogueId from "../../controllers/catalogue/getCommentById.js";
import GetCommentUsername from "../../controllers/catalogue/getCommentUsername.js";
import AddReply from "../../controllers/catalogue/AddReply.js";
import GetRepliesByCommentId from "../../controllers/catalogue/getReplies.js";
import deleteReply from "../../controllers/catalogue/deleteReply.js";
import deleteComment from "../../controllers/catalogue/deleteComment.js";
import getAllCatalogue from "../../controllers/catalogue/getAllCatalogue.js";



const router=express.Router();

router.post('/add',addCatalogue);
router.get('/get/:userid',getCatalogue);
router.get('/getClickedCat/:catalogueId',getOneCatalogue);
router.delete('/delete/:id', deleteCatalogue);
router.post('/like',likeCatalogue);
router.post('/addComment',AddComment);
router.get('/getComments/:catalogueId',GetCommentsByCatalogueId);
router.get('/getCommentBy/:commentId',GetCommentUsername);
router.post('/addReply',AddReply);
router.get('/getReply/:commentId',GetRepliesByCommentId)
router.post('/deleteReply',deleteReply);
router.post('/deleteComment',deleteComment)
router.get('/getAll',getAllCatalogue);



export default router;