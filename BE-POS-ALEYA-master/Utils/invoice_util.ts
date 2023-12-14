import db from "Loaders/sequelize";
import { currentDate } from "Utils/time_util";

const Invoice = db.Invoice;

export const createInvoiceFromCart = async (cart) => {
  const { invoice_expired_in, id } = cart;
  const expired_by =
    currentDate().getTime() + (invoice_expired_in || 14) * 24 * 60 * 60 * 1000;
  const invoice_due_date = new Date(expired_by);

  await Invoice.create({
    invoice_due_date,
    transaction_id: id,
  });
};
