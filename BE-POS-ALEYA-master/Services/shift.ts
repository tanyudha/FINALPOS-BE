import { Request, Response } from "express";

import {
  updateShiftExpense,
  isShiftValid,
  calculateEndShift,
} from "Utils/shift_util";
import { currentTime } from "Utils/time_util";

import db from "Loaders/sequelize";
import { dateFilter } from "../Utils/time_util";
import { get_existing_auth } from "../Utils/auth_util";

interface iWhere {
  [name: string]: any;
}

const Shift = db.Shift;
const Expense = db.Expense;
const Transaction = db.Transaction;

export const create_shift = async (req, res: Response) => {
  try {
    const cashier_id = req.user.id;
    const cashier_name = req.user.name;
    const ending_shift = null;
    const where = { cashier_id, ending_shift };
    const existingShift = await Shift.findOne({ where });

    if (existingShift)
      throw new Error(
        `Kasir ini memiliki shift yang belum berakhir. Silakan logout dari perangkat/browser lain`
      );

    const { starting_cash } = req.body;
    const starting_shift = currentTime();

    const shift = await Shift.create({
      starting_cash,
      starting_shift,
      cashier_id,
      cashier_name,
    });

    res.send(shift);
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const end_shift = async (req, res: Response) => {
  try {
    const cashier_id = req.user.id;
    const { id, actual_ending_cash } = req.body;
    const ending_shift = currentTime();

    const where = { cashier_id, id };

    const {
      cash_from_transaction,
      cash_from_invoice,
      transfer_from_transaction,
      transfer_from_invoice,
    } = await calculateEndShift(id);

    const expected_ending_cash = cash_from_transaction + cash_from_invoice;

    await Shift.update(
      {
        actual_ending_cash,
        ending_shift,
        cash_from_invoice,
        cash_from_transaction,
        transfer_from_invoice,
        transfer_from_transaction,
        expected_ending_cash,
      },
      { where }
    );

    const existing_auth = await get_existing_auth(cashier_id);
    if (existing_auth) {
      existing_auth.logout = ending_shift;
      await existing_auth.save();
    }

    res.status(200).json({
      status: "success",
      message: "Shift berakhir!",
    });
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const get_active_shift = async (req, res: Response) => {
  try {
    const cashier_id = req.user.id;
    const ending_shift = null;
    const where = { cashier_id, ending_shift };

    const shift = await Shift.findOne({ where, include: Expense });

    res.send(shift);
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const add_expenses = async (req, res) => {
  try {
    const cashier_id = req.user.id;
    const { id, expenses } = req.body;

    if (!(await isShiftValid({ cashier_id, id })))
      throw new Error(
        "Anda tidak bisa menambah pengeluaran di shift yang telah berakhir."
      );

    await updateShiftExpense({ id, expenses });

    res.send({ message: "Pengeluaran tercatat." });
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const get_all_shift = async (req, res: Response) => {
  try {
    const { id, cashier_id, starting_shift } = req.query;
    let where: iWhere = {};
    if (id) where.id = id;
    if (cashier_id) where.cashier_id = cashier_id;
    if (starting_shift) where.starting_shift = dateFilter(starting_shift);

    const shift = await Shift.findAll({ where });
    res.send(shift);
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const get_dashboard_info = async (req, res: Response) => {
  try {
    const { starting_shift } = req.query;
    let where: iWhere = {};
    const include = { all: true, nested: true };
    where.starting_shift = dateFilter(starting_shift);
    const shifts = await Shift.findAll({ where, include });

    const refundedTransactions = await Transaction.findAll({
      where: {
        refundedAt: dateFilter(starting_shift),
      },
    });

    let expenses = 0;
    let sales = 0;

    shifts.forEach((shift: any) => {
      shift.transactions.forEach(
        ({ transaction_method: tfMethod, total }: any) => {
          const isPaid = tfMethod === "Cash" || tfMethod === "Transfer";
          if (isPaid) sales += +total;
        }
      );
      shift.expenses.forEach(({ total }: any) => {
        expenses += +total;
      });
    });

    refundedTransactions.forEach((refundedTransaction: any) => {
      sales -= refundedTransaction.total;
    });

    res.send({ expenses, sales });
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const get_shift_detail = async (req, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Shift id tidak boleh kosong!");
    const where = { id };
    const include = { all: true, nested: true };

    const shift = await Shift.findOne({ where, include });
    res.send(shift);
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const is_cashier_available = async (req: Request, res: Response) => {
  try {
    const where = {
      ending_shift: null,
    };
    const shift = await Shift.findOne({ where });
    res.status(200).send(shift);
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    });
  }
};
