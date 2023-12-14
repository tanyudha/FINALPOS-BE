import { VALIDATE_DATE } from "Utils/model_validation_util";

export default (sequelize, DataTypes) => {
  const Shift = sequelize.define(
    "shift",
    {
      cashier_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            arg: true,
            msg: "Nama kasir tidak boleh kosong",
          },
        },
      },
      starting_cash: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Modal awal tidak boleh kosong",
          },
          isDecimal: {
            args: true,
            msg: "Modal awal harus berupa angka",
          },
        },
      },
      actual_ending_cash: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
        validate: {
          isDecimal: {
            args: true,
            msg: "Cash akhir aktual harus berupa angka",
          },
        },
      },
      starting_shift: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
        validate: VALIDATE_DATE,
      },
      ending_shift: {
        type: DataTypes.DATE,
        validate: VALIDATE_DATE,
      },
    },
    {
      tableName: "shift",
    }
  );

  return Shift;
};
