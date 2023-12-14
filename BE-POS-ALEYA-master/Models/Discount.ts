export default (sequelize, DataTypes) => {
  const Discount = sequelize.define(
    "discount",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            arg: true,
            msg: "Nama diskon tidak boleh kosong",
          },
        },
      },
      is_percentage: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      amount: {
        type: DataTypes.DECIMAL,
        validate: {
          isDecimal: {
            args: true,
            msg: "Nominal diskon harus berupa angka",
          },
          custom(val) {
            if (val < 0) throw new Error("Nominal diskon tidak boleh negatif");
            if (!this.is_percentage && !val)
              throw new Error("Nominal diskon tidak boleh kosong");
          },
        },
      },
      percentage: {
        type: DataTypes.DECIMAL,
        validate: {
          isDecimal: {
            args: true,
            msg: "Persentase diskon harus berupa angka",
          },
          custom(val) {
            if (val < 0)
              throw new Error("Persentase diskon tidak boleh kurang dari 0");
            if (val > 100)
              throw new Error("Persentase diskon tidak boleh lebih dari 100");
            if (this.percentage && !val)
              throw new Error("Persentase diskon tidak boleh kosong");
          },
        },
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        default: true,
      },
    },
    {
      tableName: "discount",
    }
  );

  return Discount;
};
