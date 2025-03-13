import Pengaduan from "../models/pengaduan.js";
import StatusPengaduan from "../models/status_pengaduan.js";
import { nanoid } from "nanoid";

export const createPengaduan = async (req, res) => {
    try {
        const { lokasi, kronologi, bukti } = req.body;

        const newStatus = await StatusPengaduan.create({
            status: "antre",
            keterangan: "",
        });

        const randomCode = nanoid(10);
        const newPengaduan = await Pengaduan.create({
            kode: randomCode,
            lokasi,
            kronologi,
            bukti,
            status_pengaduan_id: newStatus.id, 
        });

        res.status(201).json(newPengaduan);
    } catch (error) {
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
        const { kode } = req.body;
        const pengaduan = await Pengaduan.findOne({
            where: { kode },
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

