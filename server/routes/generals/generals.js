import express from "express";
const router=express.Router();

import getUserController from "../../controllers/generals/getUser.js";
import getAllUsers from "../../controllers/generals/getAllUsers.js";
import checkValidProfile from "../../controllers/generals/checkValidProfile.js";
import searchUserName from "../../controllers/generals/searchUserName.js";

router.get("/getUser",getUserController);
router.get("/getAllUsers",getAllUsers);
router.post("/checkProfile",checkValidProfile);

router.get("/searchUser/:usernameText",searchUserName);

export default router;