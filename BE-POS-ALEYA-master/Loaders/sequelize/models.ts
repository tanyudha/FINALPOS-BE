import { DataTypes } from "sequelize";
import conn from "./connection";

import {
	AdjustmentModel,
	AdjustmentDetailModel,
	CustomerModel,
	DiscountModel,
	ExpenseModel,
	InvoiceModel,
	ItemModel,
	AuthHistoryModel,
	PurchaseOrderModel,
	PurchaseOrderDetailModel,
	ShiftModel,
	TransactionModel,
	TransactionDetailModel,
	TransactionDetailDiscountModel,
	UserModel,
} from "Models";

const Adjustment = AdjustmentModel(conn, DataTypes);
const AdjustmentDetail = AdjustmentDetailModel(conn, DataTypes);
const Customer = CustomerModel(conn, DataTypes);
const Discount = DiscountModel(conn, DataTypes);
const Expense = ExpenseModel(conn, DataTypes);
const Invoice = InvoiceModel(conn, DataTypes);
const Item = ItemModel(conn, DataTypes);
const AuthHistory = AuthHistoryModel(conn, DataTypes);
const PurchaseOrder = PurchaseOrderModel(conn, DataTypes);
const PurchaseOrderDetail = PurchaseOrderDetailModel(conn, DataTypes);
const Shift = ShiftModel(conn, DataTypes);
const Transaction = TransactionModel(conn, DataTypes);
const TransactionDetail = TransactionDetailModel(conn, DataTypes);
const TransactionDetailDiscount = TransactionDetailDiscountModel(conn, DataTypes);
const User = UserModel(conn, DataTypes);

export {
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
};
