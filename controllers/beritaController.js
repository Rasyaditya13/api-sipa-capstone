import DataKekerasan from "../models/data_kekerasan.js";

export const getDataKekerasan = async (req, res) => {
    try {
        const dataKekerasan = await DataKekerasan.findAll();
        res.status(200).json(dataKekerasan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};  