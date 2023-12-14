const { DataTypes } = require("sequelize");

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.addColumn(
					"transaction",
					"status",
					{
						type: DataTypes.ENUM("complete", "refunded"),
						defaultValue: "complete",
						allowNull: false,
					},
					{ transaction: t }
				),
				queryInterface.addColumn(
					"transaction",
					"refundedAt",
					{
						type: DataTypes.DATE,
					},
					{ transaction: t }
				),
			]);
		});
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.removeColumn("transaction", "status", { transaction: t }),
				queryInterface.removeColumn("transaction", "refundedAt", { transaction: t }),
			]);
		});
	},
};
