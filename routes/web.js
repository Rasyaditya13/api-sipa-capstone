import express from "express";
const router = express.Router();

import {getUser} from "../controllers/userController.js";

router.get("/users", getUser);

export default router;
