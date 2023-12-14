import {
	Adjustment,
	AdjustmentDetail,
	Customer,
	Discount,
	Expense,
	Invoice,
	Item,
	AuthHistory,
	PurchaseOrder,
	PurchaseOrderDetail,
	Shift,
	Transaction,
	TransactionDetail,
	TransactionDetailDiscount,
	User,
} from "./models";

//relasi adjustment
Adjustment.hasMany(AdjustmentDetail, {
	foreignKey: "adjustment_id",
	onDelete: "CASCADE",
});
AdjustmentDetail.belongsTo(Item, { foreignKey: "item_id" });

//relasi purchase order
PurchaseOrder.hasMany(PurchaseOrderDetail, {
	foreignKey: "purchase_order_id",
	onDelete: "CASCADE",
});
PurchaseOrderDetail.belongsTo(Item, { foreignKey: "item_id" });

//shift relations
Shift.belongsTo(User, { foreignKey: "cashier_id" });
Shift.hasMany(Expense, { foreignKey: "shift_id", onDelete: "CASCADE" });
Shift.hasMany(Transaction, { foreignKey: "shift_id", onDelete: "CASCADE" });

User.hasMany(Shift, { foreignKey: "cashier_id" });

//relasi transaction
Transaction.hasMany(TransactionDetail, {
	foreignKey: "transaction_id",
	onDelete: "CASCADE",
});
TransactionDetail.belongsTo(Item, { foreignKey: "item_id" });
Transaction.belongsTo(User, { foreignKey: "cashier_id", as: "cashier" });
Transaction.belongsTo(User, { foreignKey: "employee_id", as: "employee" });
TransactionDetail.belongsToMany(Discount, {
	through: TransactionDetailDiscount,
	foreignKey: "transaction_detail_id",
});
Transaction.hasOne(Invoice, {
	foreignKey: "transaction_id",
	onDelete: "CASCADE",
});
Invoice.belongsTo(Transaction, {
	foreignKey: "transaction_id",
	onDelete: "CASCADE",
});
Discount.belongsToMany(TransactionDetail, {
	through: TransactionDetailDiscount,
	foreignKey: "discount_id",
});

Customer.hasMany(Transaction, { foreignKey: "customer_id" });

//relasi user
User.hasMany(AuthHistory, { foreignKey: "user_id", onDelete: "CASCADE" });
User.hasMany(Transaction, { foreignKey: "cashier_id" });
User.hasMany(Transaction, { foreignKey: "employee_id" });

export {
	Adjustment,
	AdjustmentDetail,
	Customer,
	Discount,
	Expense,
	Invoice,
	Item,
	AuthHistory,
	PurchaseOrder,
	PurchaseOrderDetail,
	Shift,
	Transaction,
	TransactionDetail,
	TransactionDetailDiscount,
	User,
};
