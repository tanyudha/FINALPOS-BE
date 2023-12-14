import { currentTime } from "Utils/time_util";

export default (sequelize, DataTypes) => {
  const Expense = sequelize.define(
    "expense",
    {
      judul: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Judul tidak boleh kosong",
          },
        },
      },
      deskripsi: {
        type: DataTypes.STRING,
      },
      total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Total tidak boleh kosong",
          },
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
    },
    {
      tableName: "expense",
    }
  );

  return Expense;
};
