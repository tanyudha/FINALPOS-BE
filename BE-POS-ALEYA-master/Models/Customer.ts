import {
  validation,
  PHONENUM_REGEX,
  ALPHANUM_REGEX,
} from "Utils/model_validation_util";

export default (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "customer",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            args: true,
            msg: "Nama customer tidak boleh kosong",
          },
          is: validation(
            ALPHANUM_REGEX,
            "Nama harus berupa kombinasi berupa alfabet, angka, atau spasi"
          ),
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Nomor telepon customer tidak boleh kosong",
          },
          is: validation(
            PHONENUM_REGEX,
            "Nama harus berupa kombinasi berupa angka atau spasi"
          ),
        },
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "customer",
    }
  );

  return Customer;
};
