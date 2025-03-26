import Pengaduan from "../models/pengaduan.js";
import StatusPengaduan from "../models/status_pengaduan.js";
import db from "../config/database.js";
import { nanoid } from "nanoid";

export const createPengaduan = async (req, res) => {
    const transaction = await db.transaction();

    try {
        const { tanggal,umur, gender, lokasi, kronologi, bukti } = req.body;
        const randomCode = nanoid(10);
        const formatTanggal = tanggal ? new Date(tanggal).toISOString().split("T")[0] : new Date().toISOString().split("T")[0];

        const newStatus = await StatusPengaduan.create({
            status: "antre",
            keterangan: "",
        }, { transaction });

        const newPengaduan = await Pengaduan.create({
            kode: randomCode,
            tanggal: formatTanggal,
            umur,
            gender,
            lokasi,
            kronologi,
            bukti,
            status_pengaduan_id: newStatus.id, 
        }, { transaction });

        await transaction.commit();

        res.status(201).json({
            pengaduan: newPengaduan,
            status_pengaduan: newStatus,
        });

    } catch (error) {
        await transaction.rollback(); 
        res.status(500).json({ error: error.message });
    }
};


export const getPengaduan = async (req, res) => {
    try {
        const pengaduan = await Pengaduan.findAll({
            include: [
                {
                    model: StatusPengaduan,
                    attributes: ["status", "keterangan"],
                },
            ],
        });

        res.status(200).json(pengaduan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateStatusPengaduan = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, keterangan } = req.body;

        const statusPengaduan = await StatusPengaduan.findByPk(id);
        if (!statusPengaduan) {
            return res.status(404).json({ error: "Status Pengaduan tidak ditemukan" });
        }

        statusPengaduan.status = status;
        statusPengaduan.keterangan = keterangan;
        await statusPengaduan.save();

        res.status(200).json(statusPengaduan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  

export const cekpengaduan = async (req, res) => {
    try {
        const { kode } = req.params;
        const pengaduan = await Pengaduan.findOne({
            where: { kode },
            include: [
                {
                    model: StatusPengaduan,
                    attributes: ["status", "keterangan"],
                },
            ],
        });``
        res.status(200).json(pengaduan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

