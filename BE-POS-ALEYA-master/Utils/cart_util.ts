import db from "Loaders/sequelize";
import { Op } from "sequelize";
import {
  get_discounts_from_transaction_detail,
  update_transaction_detail_discounts,
} from "./discount_util";

import { get_item } from "./item_util";
import { getIdListFromDocuments } from "./map_util";

const Transaction = db.Transaction;
const TransactionDetail = db.TransactionDetail;
const Item = db.Item;

export const isCartValid = async ({ id }) => {
  const cashier_id = null;
  const where = { id, cashier_id, transaction_method: "Cart" };
  const cart = await Transaction.findOne({ where });

  return cart !== null;
};

export const clear_cart_items = async (cart) => {
  const { id, transaction_details } = cart;

  const new_ids = getIdListFromDocuments(transaction_details);

  const where = {
    transaction_id: id,
    id: {
      [Op.not]: new_ids,
    },
  };

  return await TransactionDetail.destroy({ where });
};

export const add_cart_item = async (td, transaction_id, is_checkout) => {
  const { item_id, qty, price_type } = td;

  const item = await get_item(item_id); //memastikan itemnya valid

  const TD = await TransactionDetail.create({
    item_id,
    qty,
    price_type,
    transaction_id,
  });
  td.id = TD.id;

  return await update_cart_item(td, is_checkout, item);
};

export const update_cart_item = async (
  td,
  is_checkout: boolean,
  item = null
) => {
  try {
    await update_transaction_detail_discounts(td);
    item = item || (await get_item(td.item_id));
    const { item_id, qty, price_type, id } = td;
    const { price, price_sum, price_final } = await calculate_item_prices(
      td,
      item
    );
    const where = { id };
    await TransactionDetail.update(
      {
        price,
        price_sum,
        price_final,
        item_id,
        qty,
        price_type,
      },
      { where }
    );
    if (is_checkout) {
      await Item.update(
        { stock: item.stock - qty },
        { where: { id: item_id } }
      );
    }
    return price_final;
  } catch (e) {
    throw new Error(e);
  }
};

export const calculate_item_prices = async (td, item = null) => {
  const discounts = await get_discounts_from_transaction_detail(td.id);
  item = item || (await get_item(td.item_id));

  const price = item[`price_${td["price_type"]}`];
  const price_sum = price * td["qty"];

  let discount_sum = 0;
  if (discounts?.length)
    discounts.forEach((disc) => {
      if (disc.is_percentage)
        discount_sum += (parseInt(disc.percentage) / 100) * price_sum;
      else discount_sum += parseInt(disc.amount);
    });

  const price_final = price_sum - discount_sum;

  return { price, price_sum, price_final };
};
