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
      return res.status(401).json({ error: "Username atau password salah" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Username atau password salah" });
    }

    const userRole = user.role;

    const roleRedirect = {
      tamu: "/",
      petugas: "/dashboard",
    };
    let redirectPage = roleRedirect[userRole];


    const token = jwt.sign (
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login berhasil",
      user: {
        id: user.id,
        email: user.email,
        password: user.password,
        token: token,
        role: userRole,
      },
      token: token,
      redirectPage: redirectPage,
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
