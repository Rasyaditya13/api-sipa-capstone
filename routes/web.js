import express from "express";

import {register, login} from "../controllers/UserController.js";
import {createPengaduan, getPengaduan, cekpengaduan,updateStatusPengaduan} from "../controllers/PengaduanController.js";

const router = express.Router();

//user
router.post("/register", register);
router.post("/login", login);

//pengaduan
router.post("/pengaduan", createPengaduan);
router.get("/data-pengaduan", getPengaduan);
router.get("/cek-pengaduan", cekpengaduan);

router.put("/pengaduan/:id", updateStatusPengaduan);

export default router;
