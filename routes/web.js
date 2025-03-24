import express from "express";

import {register, login, forgotPassword} from "../controllers/UserController.js";
import {createPengaduan, getPengaduan, cekpengaduan,updateStatusPengaduan} from "../controllers/PengaduanController.js";
import { getDataKekerasan } from "../controllers/beritaController.js";
import { verifyToken, authorize } from "./middleware/middleware.js";

const router = express.Router();

//user
router.post("/register", register);
router.post("/login", login);
router.put("/forgot-password", forgotPassword);

//pengaduan
router.get("/data-pengaduan", verifyToken, authorize(["admin"]), getPengaduan); 
router.put("/pengaduan/:id", verifyToken, authorize(["admin"]), updateStatusPengaduan);

router.get("/cek-pengaduan", verifyToken, authorize(["tamu"]), cekpengaduan);
router.post("/pengaduan", verifyToken, authorize(["tamu"]), createPengaduan);

//berita
router.get("/data-kekerasan",getDataKekerasan )

export default router;
