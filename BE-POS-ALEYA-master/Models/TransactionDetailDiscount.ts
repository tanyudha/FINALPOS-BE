export default (sequelize, DataTypes) => {
	const TransactionDetailDiscount = sequelize.define(
		"transaction_detail_discount",
		{},
		{
			tableName: "transaction_detail_discount",
		}
	);

	return TransactionDetailDiscount;
};
