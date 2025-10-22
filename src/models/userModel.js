import pool from '../config/db.js';

export const createUser = async (username, email, password) => {
  const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, username, email;
  `;
  const { rows } = await pool.query(query, [username, email, password]);
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

export const getAllUsers = async () => {
  const query = 'SELECT id, username, email, role, avatar_url FROM users';
  const { rows } = await pool.query(query);
  return rows;
};

export const updateUserProfile = async (id, username, email) => {
  const query = `
    UPDATE users 
    SET username=$1, email=$2, updated_at=NOW()
    WHERE id=$3
  `;
  await pool.query(query, [username, email, id]);
};

export const updateUserAvatar = async (id, avatarUrl) => {
  const query = `
    UPDATE users
    SET avatar_url=$1, updated_at=NOW()
    WHERE id=$2
  `;
  await pool.query(query, [avatarUrl, id]);
};
