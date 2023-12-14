export default (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "item",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            args: true,
            msg: "Nama barang tidak boleh kosong",
          },
        },
      },
      stock: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
        validate: {
          isDecimal: {
            args: true,
            msg: "Stok awal harus berupa angka",
          },
        },
      },
      price_retail: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Harga eceran tidak boleh kosong",
          },
          isDecimal: {
            args: true,
            msg: "Harga eceran harus berupa angka",
          },
        },
      },
      price_wholesale: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Harga grosir tidak boleh kosong",
          },
          isDecimal: {
            args: true,
            msg: "Harga grosir harus berupa angka",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "item",
    }
  );

  return Item;
};
