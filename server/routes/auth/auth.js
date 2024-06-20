import express from "express";
const router=express.Router();

import AuthController from "../../controllers/auth/auth.js"

router.post("/google-token",AuthController);

export default router;