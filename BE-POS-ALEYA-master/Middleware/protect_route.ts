import db from "Loaders/sequelize";
import { verify_token } from "Utils/auth_util";

const User = db.User;

const protect_route = async (req, res, next) => {
  const { authorization: auth } = req.headers;
  const token = auth && auth.startsWith("Bearer") ? auth.split(" ")[1] : null;
  try {
    // Check token
    if (!token) throw new Error("Anda belum login.");

    // Verify token
    const { id } = await verify_token(token, process.env.JWT_SECRET_KEY);
    const where = { id };
    // Check user
    const user = await User.findOne({ where });
    if (!user) throw new Error("Akun tidak ditemukan/sudah dihapus.");
    req.user = user.dataValues;
    next();
  } catch (err) {
    res.status(err.code || 401).json({
      status: "failed",
      message: err.message,
    });
  }
};

export default protect_route;
