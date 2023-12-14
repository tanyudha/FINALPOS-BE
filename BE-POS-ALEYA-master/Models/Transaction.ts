import { PHONENUM_REGEX, ALPHANUM_REGEX, validation } from "Utils/model_validation_util";

import { currentTime } from "Utils/time_util";

export default (sequelize, DataTypes) => {
	const Transaction = sequelize.define(
		"transaction",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "id tidak boleh kosong",
					},
				},
			},
			customer_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Nama customer tidak boleh kosong",
					},
					is: validation(
						ALPHANUM_REGEX,
						"Nama customer harus merupakan kombinasi angka, huruf, atau spasi"
					),
				},
			},
			customer_phone: {
				// in case the number includes +62
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Nomor telepon tidak boleh kosong",
					},
					is: validation(
						PHONENUM_REGEX,
						"Nomor telepon harus merupakan kombinasi angka, huruf, atau spasi"
					),
				},
			},
			cashier_name: {
				type: DataTypes.STRING,
			},
			employee_name: {
				type: DataTypes.STRING,
			},
			total: {
				type: DataTypes.DECIMAL,
				allowNull: true,
				validate: {
					// notNull: {
					//   args: true,
					//   msg: "Total tidak boleh kosong",
					// },
					isDecimal: {
						args: true,
						msg: "Total harus berupa angka",
					},
				},
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: currentTime,
			},
			transaction_method: {
				type: DataTypes.ENUM("Cart", "Transfer", "Cash", "Invoice"),
				defaultValue: "Cart",
				validate: {
					isIn: {
						args: [["Cart", "Transfer", "Cash", "Invoice"]],
						msg: "Metode transaksi harus berupa 'Cart', 'Transfer', 'Cash', atau 'Invoice'",
					},
				},
			},
			is_invoice: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			status: {
				type: DataTypes.ENUM("complete", "refunded"),
				defaultValue: "complete",
				allowNUll: false,
			},
			refundedAt: {
				type: DataTypes.DATE,
			},
		},
		{
			tableName: "transaction",
		}
	);

	return Transaction;
};
