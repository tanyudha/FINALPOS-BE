import db from "Loaders/sequelize";

import {
  get_discounts_from_transaction_detail,
  update_transaction_detail_discounts,
} from "Utils/discount_util";
import { get_item } from "./item_util";

const Transaction = db.Transaction;
const TransactionDetail = db.TransactionDetail;
const TransactionDetailDiscount = db.TransactionDetailDiscount;

export const get_transaction = async (id) => {
  const res = await Transaction.findByPk(id);
  if (!res) throw new Error("Transaksi tidak ditemukan");
  else return res;
};

export const isTransactionDetailExist = async (id) => {
  if (!id) return false;
  const TD = await TransactionDetail.findByPk(id);
  return TD !== null;
};
