import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Artikel = db.define(
    "artikel",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        judul: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isi: {
            type: DataTypes.JSON,
            allowNull: false,
            
        },
        kategori: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

export default Artikel;