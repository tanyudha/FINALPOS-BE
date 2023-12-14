import { currentTime } from "Utils/time_util";

export default (sequelize, DataTypes) => {
  const TransactionDetail = sequelize.define(
    "transaction_detail",
    {
      qty: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          isInt: {
            args: true,
            msg: "Banyak barang harus berupa bilangan bulat",
          },
          custom(val) {
            if (val < 0) throw new Error("Banyak barang tidak boleh negatif");
            if (!val) throw new Error("Banyak barang tidak boleh kosong");
          },
        },
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: 0,
        validate: {
          // notNull: {
          // 	args: true,
          // 	msg: "Harga tidak boleh kosong",
          // },
          isDecimal: {
            args: true,
            msg: "Harga harus berupa bilangan bulat",
          },
          // custom(val) {
          // 	if (val < 0) throw new Error("Harga tidak boleh negatif");
          // 	if (!val) throw new Error("Harga tidak boleh kosong");
          // },
        },
      },
      price_sum: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: 0,
        validate: {
          // notNull: {
          // 	args: true,
          // 	msg: "Total harga tidak boleh kosong",
          // },
          isDecimal: {
            args: true,
            msg: "Total harga harus berupa bilangan bulat",
          },
          // custom(val) {
          // 	if (val < 0) throw new Error("Total harga tidak boleh negatif");
          // 	if (!val) throw new Error("Total harga tidak boleh kosong");
          // },
        },
      },
      price_final: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: 0,
        validate: {
          // notNull: {
          // 	args: true,
          // 	msg: "Total harga tidak boleh kosong",
          // },
          isDecimal: {
            args: true,
            msg: "Total harga harus berupa bilangan bulat",
          },
          // custom(val) {
          // 	if (val < 0) throw new Error("Total harga tidak boleh negatif");
          // 	if (!val) throw new Error("Total harga tidak boleh kosong");
          // },
        },
      },
      price_type: {
        type: DataTypes.ENUM("retail", "wholesale"),
        allowNull: true,
        validate: {
          // notNull: {
          // 	args: true,
          // 	msg: "Jenis harga tidak boleh kosong",
          // },
          isIn: {
            args: [["retail", "wholesale"]],
            msg: "Jenis harga harus berupa 'retail' atau 'wholesale'",
          },
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: currentTime,
      },
    },
    {
      tableName: "transaction_detail",
    }
  );

  // TransactionDetail.beforeCreate(async (td) => {
  // 	if(td.changed('qty') || td.changed('price_type') || td.changed('item_id')){
  // 		const item = await get_item(td.item_id);
  // 		const {price, price_sum, price_total} = await calculate_sum_and_total(item, td.qty, td.price_type);
  // 	}
  // })

  return TransactionDetail;
};
