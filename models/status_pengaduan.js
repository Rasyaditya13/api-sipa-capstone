import { DataTypes, Sequelize } from "sequelize";
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
    updateAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    hooks: {
      beforeUpdate: (statusPengaduan) => {
        statusPengaduan.updateAt = new Date(); 
      },
    },
  }
);

export default StatusPengaduan;
