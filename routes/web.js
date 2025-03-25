import express from "express";

import {register, login, forgotPassword} from "../controllers/UserController.js";
import {createPengaduan, getPengaduan, cekpengaduan,updateStatusPengaduan} from "../controllers/PengaduanController.js";
import { getDataKekerasan, getArtikelKekerasan } from "../controllers/beritaController.js";
// import { verifyToken, authorize } from "./middleware/middleware.js";

const router = express.Router();

//user
router.post("/register", register);
router.post("/login", login);
router.put("/forgot-password", forgotPassword);

//pengaduan
router.get("/data-pengaduan", getPengaduan); 
router.put("/pengaduan/:id", updateStatusPengaduan);

router.get("/cek-pengaduan", cekpengaduan);
router.post("/pengaduan", createPengaduan);

//berita
router.get("/data-kekerasan",getDataKekerasan );
router.get("/artikel", getArtikelKekerasan);

export default router;
