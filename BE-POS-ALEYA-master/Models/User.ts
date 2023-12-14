import { validation, USERNAME_REGEX } from "Utils/model_validation_util";

import bcrypt from "bcryptjs";

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            args: true,
            msg: "Username tidak boleh kosong",
          },
          is: validation(
            USERNAME_REGEX,
            "Username harus merupakan kombinasi angka, huruf, atau garis bawah (_)"
          ),
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Nama tidak boleh kosong",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Password tidak boleh kosong",
          },
        },
      },
      role: {
        type: DataTypes.ENUM("Admin", "Pegawai", "Kasir", "PO"),
        default: "Pegawai",
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Role tidak boleh kosong",
          },
          isIn: {
            args: [["Admin", "Pegawai", "Kasir", "PO"]],
            msg: "harus berupa 'Admin', 'Pegawai', 'Kasir', atau 'PO'",
          },
        },
      },
    },
    {
      tableName: "user",
    }
  );

  User.beforeCreate(async (user) => {
    // if (user.changed("password"))
    //   user.password = await bcrypt.hash(
    //     user.password,
    //     parseInt(process.env.BCRYPT_SALTVERSION)
    //   );

    user.username = user.username.toLowerCase();
  });

  User.prototype.check_password = async (inputPassword, actualPassword) =>
    inputPassword===actualPassword
    // await bcrypt.compare(inputPassword, actualPassword);

  return User;
};
