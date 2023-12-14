import discount from "API/discount";
import db from "Loaders/sequelize";
import { Op } from "sequelize";
const Discount = db.Discount;
const TransactionDetailDiscount = db.TransactionDetailDiscount;

export const get_discounts_from_transaction_detail = async (
  transaction_detail_id
) => {
  const where = { transaction_detail_id };
  const TDD = await TransactionDetailDiscount.findAll({ where, raw: true });
  const discount_ids = TDD.map((row) => row.discount_id);
  const discounts = [];
  for (let i = 0; i < discount_ids.length; i++) {
    const res = await Discount.findOne({
      where: { id: discount_ids[i] },
      raw: true,
    });
    discounts.push(res);
  }
  return discounts;
};

export const update_transaction_detail_discounts = async (td) => {
  const where = { transaction_detail_id: td.id };
  await TransactionDetailDiscount.destroy({ where });
  const TDD = await map_discounts_from_transaction_detail(td);
  return await TransactionDetailDiscount.bulkCreate(TDD);
};

export const map_discounts_from_transaction_detail = async (td) => {
  const transaction_detail_id = td.id;
  return td.discounts.map((row) => {
    const discount_id = row.id;
    return { transaction_detail_id, discount_id };
  });
};
