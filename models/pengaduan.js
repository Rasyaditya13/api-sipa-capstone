import { DataTypes } from "sequelize";
import db from "../config/database.js";
import StatusPengaduan from "./status_pengaduan.js";

const Pengaduan = db.define(
  "pengaduan",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    kode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
      tanggal: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    lokasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kronologi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bukti: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status_pengaduan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: StatusPengaduan,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true, 
    timestamps: false,
  }
);

Pengaduan.belongsTo(StatusPengaduan, { foreignKey: "status_pengaduan_id" });
StatusPengaduan.hasMany(Pengaduan, { foreignKey: "status_pengaduan_id" });

export default Pengaduan;
