import express from "express";

import {register, login, forgotPassword, getUser, getUserById, updateUser, deleteUser, updateUserRole} from "../controllers/UserController.js";
import {createPengaduan, getPengaduan, cekpengaduan,updateStatusPengaduan} from "../controllers/PengaduanController.js";
import { getDataKekerasan, getArtikelKekerasan } from "../controllers/beritaController.js";
// import { verifyToken, authorize } from "./middleware/middleware.js";

import axios from "axios";
const router = express.Router();

//user
router.post("/register", register);
router.post("/login", login);
router.put("/forgot-password", forgotPassword);
router.get("/users", getUser);
router.get("/users/:id", getUserById); 
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);  
router.put("/edit-role/:id", updateUserRole);

//pengaduan
router.get("/data-pengaduan", getPengaduan); 
router.put("/pengaduan/:id", updateStatusPengaduan);

router.get("/cek-pengaduan/:kode", cekpengaduan);
router.post("/pengaduan", createPengaduan);

//berita
router.get("/data-kekerasan",getDataKekerasan );
router.get("/artikel", getArtikelKekerasan);

router.post("/ask", async (req, res) => {
    try {
      const { question } = req.body;
  
      const response = await axios.post(
        "https://sipa-chat-production.up.railway.app/ask",
        {
          question: question,
        }
      );
  
      res.json(response.data);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Gagal memproses permintaan ke AI service" });
    }
  });


export default router;
