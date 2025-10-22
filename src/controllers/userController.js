import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';
import { getAllUsers, updateUserProfile, updateUserAvatar } from '../models/userModel.js';


export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data user', error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { username, email } = req.body;
    await updateUserProfile(id, username, email);
    res.json({ message: 'Profil berhasil diperbarui' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal memperbarui profil', error: err.message });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Tidak ada file diunggah' });

    const uploadStream = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'avatars' },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await uploadStream();
    const { id } = req.user;
   
     await updateUserAvatar(id, result.secure_url);
    res.json({ message: 'Avatar berhasil diunggah', url: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: 'Gagal upload avatar', error: err.message });
  }

  
};