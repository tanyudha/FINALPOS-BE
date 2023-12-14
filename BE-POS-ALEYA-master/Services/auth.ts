import { Request, Response, NextFunction } from "express";

import db from "Loaders/sequelize";
import { create_send_token, verify_token } from "Utils/auth_util";
import { sendDefaultError } from "Utils/error_util";

const User = db.User;

export const protect_route = async (req, res: Response, next: NextFunction) => {
  const { authorization: auth } = req.headers;
  const token = auth && auth.startsWith("Bearer") ? auth.split(" ")[1] : null;

  try {
    // Check token
    if (!token)
      throw new Error(
        "Anda belum melakukan log in! Log in untuk mendapatkan akses."
      );

    // Verify token
    const { id } = await verify_token(token, process.env.JWT_SECRET_KEY);

    // Check user
    const where = { id };
    const attributes = { exclude: ["password"] };
    const user = await User.findOne({ where, attributes });
    if (!user)
      throw new Error("Akses anda telah berakhir, silakan masuk kembali.");

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const signup = async (req, res) => {
  const { username, name, password, role } = req.body;
  try {
    // Check if body request valid
    if (!name || !username || !password || !role)
      throw new Error("Data tidak valid!");

    const isUsernameUsed = await User.findOne({ where: { username } });
    if (isUsernameUsed) {
      sendDefaultError(res, "Username sudah digunakan pengguna lain");
      return;
    }

    const user = await User.create({
      username,
      name,
      password,
      role,
    });

    create_send_token(req, res, user, 201);
  } catch (err) {
    sendDefaultError(res, err);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if email and password provided
    if (!username || !password)
      throw new Error("Masukkan username dan password");

    // Check if user exists && password is correct
    const user = await User.findOne({ where: { username } });
    if (!user || !(await user.check_password(password, user.password)))
      throw new Error("Username atau password tidak sesuai");

    create_send_token(req, res, user, 200);
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const check_user = (req, res) => {
  res.send(req.user);
};
