import { currentTime } from "Utils/time_util";

export default (sequelize, DataTypes) => {
	const Adjustment = sequelize.define(
		"adjustment",
		{
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: currentTime,
			},
			description: {
				type: DataTypes.TEXT,
			},
			item_names: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			item_count: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			total_count: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
		},
		{
			tableName: "adjustment",
		}
	);

	return Adjustment;
};
