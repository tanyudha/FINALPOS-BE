import { Request, Response } from "express";
import { Op } from "sequelize";
import db from "Loaders/sequelize";

import { sendDefaultError } from "Utils/error_util";
import { dateFilter, currentTime } from "Utils/time_util";

const Invoice = db.Invoice;
const Transaction = db.Transaction;

interface iWhere {
  [name: string]: any;
}

export const get_invoices = async (req, res: Response) => {
  try {
    const {
      id,
      cashier_id,
      employee_id,
      customer_id,
      createdAt,
      page = 0,
      limit = 100,
      only_unpaid = false,
      query = "",
    } = req.query;

    let where: iWhere = {};
    let transactionWhere: iWhere = {};

    if (id) where.id = id;
    if (customer_id) transactionWhere.customer_id = customer_id;
    if (cashier_id) transactionWhere.cashier_id = cashier_id;
    if (employee_id) transactionWhere.employee_id = employee_id;
    if (createdAt) where.createdAt = dateFilter(createdAt);
    if (only_unpaid) where.invoice_status = { [Op.like]: "Unpaid" };

    if (query) {
      const substring = { [Op.substring]: query };
      transactionWhere = {
        ...transactionWhere,
        [Op.or]: [
          { customer_name: substring },
          { id: substring },
          { cashier_name: substring },
          { employee_name: substring },
        ],
      };
    }

    const order = ["createdAt", "DESC"];

    const invoices = await Invoice.findAll({
      where,
      order: [order],
      limit: parseInt(limit),
      offset: parseInt(page) * parseInt(limit),
      include: [{ model: Transaction, where: transactionWhere }],
    });

    res.send(invoices);
  } catch (err) {
    return sendDefaultError(res, err);
  }
};

export const get_invoice_detail = async (req, res: Response) => {
  try {
    const { id } = req.params;

    const where = { id };
    const include = { all: true, nested: true };

    const invoice = await Invoice.findOne({ where, include });

    if (!invoice) throw new Error("Invoice not found!");

    res.send(invoice);
  } catch (err) {
    return sendDefaultError(res, err);
  }
};

export const cancel_invoice = async (req, res: Response) => {
  try {
    const { id } = req.body;
    const invoice_status = "Cancelled";

    const where = { id };

    const invoice = await Invoice.update({ invoice_status }, { where });

    res.send(invoice);
  } catch (err) {
    return sendDefaultError(res, err);
  }
};

export const pay_invoice = async (req, res: Response) => {
  try {
    const { invoice_payment_method, id, transaction_id } = req.body;
    const paidAt = currentTime();
    const invoice_status = "Paid";

    if (!invoice_payment_method)
      throw new Error("Metode pembayaran tidak boleh kosong!");

    const where = { id };

    const invoice = await Invoice.update(
      { invoice_payment_method, paidAt, invoice_status },
      { where }
    );
    await Transaction.update(
      { cashier_name: req.user.name, cashier_id: req.user.id },
      { where: { id: transaction_id } }
    );

    res.send(invoice);
  } catch (err) {
    return sendDefaultError(res, err);
  }
};

export const delete_invoice = async (req, res: Response) => {
  try {
    const { id } = req.params;

    const where = { id };

    const invoice = await Invoice.destroy({ where });

    res.send(invoice);
  } catch (err) {
    return sendDefaultError(res, err);
  }
};
