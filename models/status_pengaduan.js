import { DataTypes } from "sequelize";
import db from "../config/database.js";

const StatusPengaduan = db.define(
  "status_pengaduan",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "antre", 
    },
    keterangan: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },~~~~~~
  {
    freezeTableName: true, 
    timestamps: false,
  }
);

export default StatusPengaduan;
