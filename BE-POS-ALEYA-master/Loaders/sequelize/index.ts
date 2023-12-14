import { DataTypes, Op } from "sequelize";
import logger from "Loaders/winston";
import dummy from "Utils/dummy";
import conn from "./connection";
import {
	Adjustment,
	AdjustmentDetail,
	AuthHistory,
	Customer,
	Discount,
	Expense,
	Invoice,
	Item,
	PurchaseOrder,
	PurchaseOrderDetail,
	Shift,
	Transaction,
	TransactionDetail,
	TransactionDetailDiscount,
	User,
} from "./relation";
import { getErrorMessage } from "Utils/error_util";

let db: { [k: string]: any } = { conn, DataTypes, Op };

db.Adjustment = Adjustment;
db.AdjustmentDetail = AdjustmentDetail;
db.Customer = Customer;
db.Discount = Discount;
db.Expense = Expense;
db.Invoice = Invoice;
db.Item = Item;
db.AuthHistory = AuthHistory;
db.PurchaseOrder = PurchaseOrder;
db.PurchaseOrderDetail = PurchaseOrderDetail;
db.Shift = Shift;
db.Transaction = Transaction;
db.TransactionDetail = TransactionDetail;
db.TransactionDetailDiscount = TransactionDetailDiscount;
db.User = User;

db.insertDummy = async () => {
	try {
		const opt = { validate: true };
		logger.info("INSERTING DUMMY...");
		await db.User.bulkCreate(dummy.User, opt);
		await db.AuthHistory.bulkCreate(dummy.AuthHistory, opt);
		await db.Shift.bulkCreate(dummy.Shift, opt);
		await db.Item.bulkCreate(dummy.Item, opt);
		await db.Customer.bulkCreate(dummy.Customer, opt);
		await db.Discount.bulkCreate(dummy.Discount, opt);
		await db.Transaction.bulkCreate(dummy.Transaction, opt);
		await db.TransactionDetail.bulkCreate(dummy.TransactionDetail, opt);
		await db.TransactionDetailDiscount.bulkCreate(dummy.TransactionDetailDiscount, opt);
		await db.Invoice.bulkCreate(dummy.Invoice, opt);
		await db.PurchaseOrder.bulkCreate(dummy.PurchaseOrder, opt);
		await db.PurchaseOrderDetail.bulkCreate(dummy.PurchaseOrderDetail, opt);
		await db.Adjustment.bulkCreate(dummy.Adjustment, opt);
		await db.AdjustmentDetail.bulkCreate(dummy.AdjustmentDetail, opt);
		logger.info("DUMMY SUCCESSFULLY INSERTED");
	} catch (err) {
		logger.error(getErrorMessage(err));
		console.log(err);
	}
};

export default db;
