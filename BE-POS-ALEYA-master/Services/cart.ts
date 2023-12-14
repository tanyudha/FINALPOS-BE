import { Request, Response } from "express";

import db from "Loaders/sequelize";
import {
  clear_cart_items,
  add_cart_item,
  update_cart_item,
  isCartValid,
} from "Utils/cart_util";
import { createInvoiceFromCart } from "Utils/invoice_util";
import { currentTime } from "../Utils/time_util";

import {
  isTransactionDetailExist,
  get_transaction,
} from "Utils/transaction_util";
import shift from "API/shift";

const Transaction = db.Transaction;

export const get_carts = async (req, res) => {
  try {
    const where = { transaction_method: "Cart" };
    const carts = await Transaction.findAll({ where });

    res.send(carts);
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const get_cart_detail = async (req, res) => {
  try {
    const { id } = req.params;
    const where = { transaction_method: "Cart", id };
    const include = { all: true, nested: true };
    const carts = await Transaction.findOne({
      where,
      include,
    });

    if (!carts) throw new Error(`Transaksi tidak ditemukan`);

    res.send(carts);
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const create_cart = async (req, res: Response) => {
  try {
    const { customer_id, customer_name, customer_phone } = req.body;

    const employee_id = req.user.id;
    const employee_name = req.user.name;
    const transaction_method = "Cart";

    const transaction = await Transaction.create({
      customer_id,
      customer_name,
      customer_phone,
      employee_id,
      employee_name,
      transaction_method,
      createdAt: currentTime(),
    });

    res.send({ transaction });
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const update_cart = async (req, res) => {
  try {
    clear_cart_items(req.body);

    const {
      id,
      transaction_details,
      transaction_method,
      shift_id,
      customer_id,
      customer_name,
      customer_phone,
      cashier_id,
      cashier_name,
      is_checkout = false,
    } = req.body;

    if (!isCartValid(id)) throw new Error("Transaksi tidak ditemukan");

    let total = [];

    await Promise.all(
      transaction_details.map(async (td) => {
        if (!(await isTransactionDetailExist(td.id))) {
          total.push(await add_cart_item(td, id, is_checkout));
        } else {
          total.push(await update_cart_item(td, is_checkout));
        }
      })
    );

    total = total.reduce((a, b) => a + b, 0);

    const where = { id };
    let cart: any;
    const payload = { total, transaction_method } as any;
    if (shift_id) payload.shift_id = shift_id;
    if (customer_id) payload.customer_id = customer_id;
    if (customer_name) payload.customer_name = customer_name;
    if (customer_phone) payload.customer_phone = customer_phone;
    if (cashier_id) payload.cashier_id = cashier_id;
    if (cashier_name) payload.cashier_name = cashier_name;

    if (transaction_method) {
      if (transaction_method !== "Cart") payload.createdAt = currentTime();
      if (transaction_method === "Invoice") payload.is_invoice = true;
      cart = await Transaction.update(payload, { where });

      if (transaction_method === "Invoice") {
        createInvoiceFromCart(req.body);
      }
    } else {
      cart = await Transaction.update({ total }, { where });
    }

    res.send(cart);
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    });
  }
};
