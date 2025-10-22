import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser, findUserByEmail } from '../models/userModel.js';
dotenv.config();

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validasi sederhana
    if (!email.includes('@')) return res.status(400).json({ message: 'Format email tidak valid' });
    if (password.length < 6) return res.status(400).json({ message: 'Password minimal 6 karakter' });

    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email sudah digunakan' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, hashed);

    res.status(201).json({ message: 'Registrasi berhasil', user });
  } catch (err) {
    res.status(500).json({ message: 'Gagal registrasi', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Email atau password salah' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ message: 'Login berhasil', token });
  } catch (err) {
    res.status(500).json({ message: 'Gagal login', error: err.message });
  }
};
