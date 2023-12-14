import { Request, Response } from "express";
import db from "Loaders/sequelize";
import { Op } from "sequelize";

import { sendDefaultError } from "Utils/error_util";

const Customer = db.Customer;

interface iWhere {
  [name: string]: any;
}

export const get_customers = async (req, res: Response) => {
  try {
    const { query, page = 0, limit = 20 } = req.query;
    const offset = parseInt(page) * parseInt(limit);
    const order = [["name", "ASC"]];
    let where: iWhere = {};
    if (query && query !== "") where.name = { [Op.substring]: query };

    const data = await Customer.findAll({
      where,
      order,
      limit: parseInt(limit),
      offset,
    });

    res.send(data);
  } catch (err) {
    sendDefaultError(res, err);
  }
};

export const create_customer = async (req, res: Response) => {
  try {
    const { name, phone, description } = req.body;

    const isNameUsed = await Customer.findOne({ where: { name } });
    if (isNameUsed) {
      sendDefaultError(res, "Pembeli dengan nama yang sama sudah ada");
      return;
    }

    if (!name || !phone)
      throw new Error("Nama dan nomor HP tidak boleh kosong!");

    const customer = await Customer.create({ name, phone, description });
    res.send(customer);
  } catch (err) {
    sendDefaultError(res, err);
  }
};

export const update_customer = async (req, res: Response) => {
  try {
    const { id, name, phone, description } = req.body;

    const isNameUsed = await Customer.findOne({ where: { name } });
    if (isNameUsed) {
      sendDefaultError(res, "Pembeli dengan nama yang sama sudah ada");
      return;
    }

    const where = { id };
    const isCustomerExist = await Customer.findOne({ where });
    if (!isCustomerExist) {
      sendDefaultError(res, "Pembeli tidak ditemukan atau sudah dihapus");
      return;
    }

    const customer = await Customer.update(
      { name, phone, description },
      { where }
    );
    res.send(customer);
  } catch (err) {
    sendDefaultError(res, err);
  }
};

export const delete_customer = async (req, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Id tidak boleh kosong");
    const where = { id };

    const isCustomerExist = await Customer.findOne({ where });
    if (!isCustomerExist) {
      sendDefaultError(res, "Pembeli tidak ditemukan atau sudah dihapus");
      return;
    }

    await Customer.destroy({ where });
    res.send("Sukses");
  } catch (err) {
    sendDefaultError(res, err);
  }
};
