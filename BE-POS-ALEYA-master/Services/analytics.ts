import { dateFilter, dateRangeFilter } from "Utils/time_util";
import { Op, Sequelize } from "sequelize";

import db from "Loaders/sequelize";
import { sendDefaultError } from "Utils/error_util";

const User = db.User;
const Expense = db.Expense;
const Transaction = db.Transaction;

export const daily_summary = async (req, res) => {
  try {
    const { date } = req.params;

    if (!date) throw new Error("Date cannot be empty!");

    const whereTransaction = {
      [Op.or]: [
        { createdAt: dateFilter(date) },
        { refundedAt: dateFilter(date) },
      ],
    };
    const where = { createdAt: dateFilter(date) };

    const all_transaction = await Transaction.findAll({
      where: whereTransaction,
    });
    const all_expense = await Expense.findAll({ where });

    let gross_sales = 0,
      expense = 0;

    await all_transaction.map(
      (t) => (gross_sales += t.status === "refunded" ? -t.total : t.total)
    );
    await all_expense.map((e) => (expense += e.total));

    const net_sales = gross_sales - expense;

    res.send({ gross_sales, expense, net_sales });
  } catch (err) {
    sendDefaultError(res, err);
  }
};

export const user_summary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate)
      throw new Error("Start date and end date cannot be empty!");

    const includeCashier = [
      { model: User, attributes: ["username", "name"], as: "cashier" },
    ];
    const includeEmployee = [
      { model: User, attributes: ["username", "name"], as: "employee" },
    ];
    const sum = [
      Sequelize.fn(
        "SUM",
        Sequelize.cast(Sequelize.col("transaction.total"), "integer")
      ),
      "total_amount",
    ];
    const order = [
      [
        Sequelize.fn(
          "SUM",
          Sequelize.cast(Sequelize.col("transaction.total"), "integer")
        ),
        "DESC",
      ],
    ];
    const whereCreate = {
      createdAt: dateRangeFilter(startDate, endDate),
      transaction_method: { [Op.ne]: "Cart" },
    };
    const whereRefund = {
      refundedAt: dateRangeFilter(startDate, endDate),
      transaction_method: { [Op.ne]: "Cart" },
    };

    const cashierTotal = await Transaction.findAll({
      where: whereCreate,
      attributes: ["cashier_id", sum],
      include: includeCashier,
      order,
      group: ["transaction.cashier_id"],
      raw: true,
    });
    const cashierRefund = await Transaction.findAll({
      where: whereRefund,
      attributes: ["cashier_id", sum],
      include: includeCashier,
      order,
      group: ["transaction.cashier_id"],
      raw: true,
    });
    const employeeTotal = await Transaction.findAll({
      where: whereCreate,
      attributes: ["employee_id", sum],
      include: includeEmployee,
      order,
      group: ["transaction.employee_id"],
      raw: true,
    });
    const employeeRefund = await Transaction.findAll({
      where: whereRefund,
      attributes: ["employee_id", sum],
      include: includeEmployee,
      order,
      group: ["transaction.employee_id"],
      raw: true,
    });

    res.send({ cashierTotal, cashierRefund, employeeTotal, employeeRefund });
  } catch (err) {
    sendDefaultError(res, err);
  }
};
