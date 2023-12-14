import jwt from "jsonwebtoken";
import { promisify } from "util";

import db from "Loaders/sequelize";

import { currentTime } from "Utils/time_util";
import e from "express";

const sign_token = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });

// const day = 86400 * 1000; //total milliseconds in a day

const AuthHistory = db.AuthHistory;

const create_send_token = async (req, res, user, statusCode) => {
  const token = sign_token(user.id);
  const expires = new Date(new Date().setUTCHours(23, 59, 59, 999));
  const cookieOptions: { [k: string]: any } = {
    expires,
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const user_id = user.id;

  await handle_auth(ip, user_id);

  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    body: {
      data: user,
      token,
    },
  });
};

const handle_auth = async (ip, user_id) => {
  const exist = await get_existing_auth(user_id);
  if (exist && exist.ip !== ip) {
    await replace_existing_auth(exist, ip, user_id);
  } else {
    await create_auth(ip, user_id);
  }
};

export const get_existing_auth = async (user_id) => {
  const where = { user_id, logout: null };
  const existing_auth = await AuthHistory.findOne({ where });
  return existing_auth;
};

const replace_existing_auth = async (exist, ip, user_id) => {
  const logout = currentTime();
  const activity_log = "Force Logout";
  exist.logout = logout;
  exist.activity_log = activity_log;
  await exist.save();
  await create_auth(ip, user_id);
};

const create_auth = async (ip, user_id) => {
  const login = currentTime();
  await AuthHistory.create({ ip, user_id, login });
};

const verify_token = promisify(jwt.verify);

export { create_send_token, verify_token };
