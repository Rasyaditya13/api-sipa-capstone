import User from "../models/users.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Nama sudah digunakan" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ nama, email, password: hashedPassword });

    res.status(201).json({ 
      id: user.id, 
      nama: user.nama,
      email: user.email,
      password: user.password, 
      role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Username atau password salah" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Username atau password salah" });
    }

    const userRole = user.role;

    let redirectPage = "/";
    if (userRole === "tamu") {
      redirectPage = "/beranda";
    } else if (userRole === "admin") {
      redirectPage = "/page-admin";
    }

    return res.status(200).json({
      message: "Login berhasil",
      user: {
        id: user.id,
        email: user.email,
        password: user.password,
        role: userRole,
      },
      redirectPage: redirectPage,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }
    res.status(200).json({ message: "Reset password berhasil" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}