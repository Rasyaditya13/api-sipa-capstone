import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { nama, email, password, confirmPassword } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "Email sudah terdaftar" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Password dan konfirmasi password harus sama" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ nama, email, password: hashedPassword });
    res.status(201).json({ message: "Pendaftaran berhasil", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Email atau password salah" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Email atau password salah" });
    }

    const token = jwt.sign (
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login berhasil",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Email tidak ditemukan" });
    }
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Password dan Konfirmasi Password harus sama" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password berhasil diubah" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "nama", "email", "role"],
    });
    if (!user) return res.status(404).json({ error: "User tidak ditemukan" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "nama", "email", "role", "createdAt"],
    });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { nama, email, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User tidak ditemukan" });

    user.nama = nama || user.nama;
    user.email = email || user.email;
    user.role = role || user.role;
    await user.save();

    res.status(200).json({ message: "User berhasil diupdate", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User tidak ditemukan" });

    await user.destroy();
    res.status(200).json({ message: "User berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};