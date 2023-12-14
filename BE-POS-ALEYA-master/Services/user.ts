import db from "Loaders/sequelize";
import { sendDefaultError } from "Utils/error_util";
import { Op } from "sequelize";

import { constructDefaultWhere, extractStandardQuery } from "Utils/api_utils";

const User = db.User;
const Shift = db.Shift;

interface iWhere {
  [name: string]: any;
}

export const get_all_users = async (req: any, res: any) => {
  try {
    const { include_admin = false, include_po = false } = req.query;
    const extractedQuery = extractStandardQuery(req.query);
    const queryFields = ["name"];
    const include = {
      model: Shift,
      required: false,
      where: {
        ending_shift: null,
      },
    };
    let { where, pagination } = constructDefaultWhere(
      extractedQuery,
      queryFields
    );

    if (include_admin && !include_po) where.role = { [Op.not]: "PO" };
    else if (include_po && !include_admin) where.role = { [Op.not]: "Admin" };
    else if (!include_po && !include_admin)
      where.role = { [Op.notIn]: ["Admin", "PO"] };

    const users = await User.findAll({ where, include, ...pagination });
    const totalUsers = await User.count({ where });
    res.status(200).json({ users, totalUsers });
  } catch (err) {
    sendDefaultError(res, err);
  }
};

export const get_user = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const where = { id };

    const user = await User.findOne({ where });
    res.send(user);
  } catch (err) {
    sendDefaultError(res, err);
  }
};

export const get_all_cashier = async (req, res) => {
  try {
    const { query } = req.query;

    let where: iWhere = {};

    if (query) where.name = { [Op.substring]: query };
    where.role = "Kasir";

    const cashiers = await User.findAll({ where });

    res.send(cashiers);
  } catch (err) {
    sendDefaultError(res, err);
  }
};

export const get_all_employee = async (req, res) => {
  try {
    const { query } = req.query;

    let where: iWhere = {};

    if (query) where.name = { [Op.substring]: query };
    where.role = "Pegawai";

    const cashiers = await User.findAll({ where });

    res.send(cashiers);
  } catch (err) {
    sendDefaultError(res, err);
  }
};

export const create_user = async (req, res) => {
  try {
    const { username, name, password, role } = req.body;

    if (!username) throw new Error("Username tidak boleh kosong!");
    if (!name) throw new Error("Name tidak boleh kosong!");
    if (!password) throw new Error("Password tidak boleh kosong!");
    if (!role || (role !== "Kasir" && role !== "Pegawai" && role !== "PO"))
      throw new Error("Role harus 'Kasir','Pegawai', 'Admin', atau 'PO'");

    const user = await User.create({ username, name, password, role });

    res.send(user);
  } catch (err) {
    sendDefaultError(res, err);
  }
};

export const update_user = async (req, res) => {
  try {
    const { username, name, password, role, id } = req.body;
    if (!id) throw new Error("ID User tidak boleh kosong!");
    const where = { id };

    const user = await User.update(
      { username, name, password, role: +id === 1 ? "Admin" : role },
      { where }
    );

    res.send(user);
  } catch (err) {
    sendDefaultError(res, err);
  }
};

export const delete_user = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("ID User tidak boleh kosong!");
    if (+id === 1) throw new Error("User ini tidak boleh dihapus.");
    const where = { id };

    await User.destroy({ where });

    res.send(`User berhasil dihapus!`);
  } catch (err) {
    sendDefaultError(res, err);
  }
};
