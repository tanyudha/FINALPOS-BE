import { currentTime } from "Utils/time_util";

export default (sequelize, DataTypes) => {
  const PurchaseOrder = sequelize.define(
		"purchase_order",
		{
			supplier: {
				type: DataTypes.STRING,
			},
			description: {
				type: DataTypes.STRING,
			},
			item_names: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: currentTime,
			},
		},
		{
			tableName: "purchase_order",
		}
	);

  return PurchaseOrder;
};
