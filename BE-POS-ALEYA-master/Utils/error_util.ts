import { Response } from "express";

const _handleSequelizeError = (msg) => {
  const splitted = msg.split(":");
  if (splitted?.length > 1) {
    const message =
      splitted[0].trim() === "SequelizeValidationError"
        ? splitted[2]
        : splitted[1];
    return message.trim();
  } else {
    return msg === "Validation error"
      ? "Terjadi kesalahan validasi. Kemungkinan ada data yang memiliki nilai yang sama atau kesalahan validasi lain"
      : msg;
  }
};

export const getErrorMessage = (err: any) => {
  const messages = err.message || err;
  const errors = [];

  // manages custom error from Sequelize
  messages.split(",\n").forEach((msg) => {
    if (msg.includes("Validation") || msg.includes("Violation")) {
      errors.push(_handleSequelizeError(msg));
    } else {
      errors.push(msg);
    }
  });

  if (!errors?.length) return;
  if (errors?.length === 1) {
    return errors[0];
  }
  return errors;
};

export const sendDefaultError = (res: Response, err: any) => {
  res.status(403).json({
    status: "failed",
    message: getErrorMessage(err),
  });
};

export const sendNotFoundError = (res: Response, err: any) => {
  res.status(400).json({
    status: "not found",
    message: getErrorMessage(err),
  });
};
