import { DataTypes } from "sequelize";
import db from "../config/database.js";

const DataKekerasan = db.define(
  "data_kekerasan",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tahun: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    korban_laki: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    korban_perempuan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    korban_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default DataKekerasan;
