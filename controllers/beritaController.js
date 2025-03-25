import DataKekerasan from "../models/data_kekerasan.js";
import Artikel from "../models/artikel.js";

export const getDataKekerasan = async (req, res) => {
    try {
        const dataKekerasan = await DataKekerasan.findAll();
        res.status(200).json(dataKekerasan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};  

export const getArtikelKekerasan = async (req, res) => {
    try {
        const dataKekerasan = await Artikel.findAll();
        res.status(200).json(dataKekerasan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};