import { VALIDATE_DATE } from "Utils/model_validation_util";

import { currentTime } from "Utils/time_util";

export default (sequelize, DataTypes) => {
  const Invoice = sequelize.define(
    "invoice",
    {
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: currentTime,
      },
      paidAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      invoice_payment_method: {
        type: DataTypes.ENUM("Cash", "Transfer"),
        allowNull: true,
        validate: {
          isIn: {
            args: [["Cash", "Transfer"]],
            msg: "Metode pembayaran invoice harus berupa 'Cash' atau 'Transfer'",
          },
        },
      },
      invoice_status: {
        type: DataTypes.ENUM("Paid", "Unpaid", "Cancelled"),
        defaultValue: "Unpaid",
        allowNull: true,
        validate: {
          isIn: {
            args: [["Paid", "Unpaid", "Cancelled"]],
            msg: "Harus berupa 'Paid', 'Unpaid', atau 'Cancelled'",
          },
        },
      },
      invoice_due_date: {
        type: DataTypes.DATE,
        // 14 days after transaction
        defaultValue: new Date(
          currentTime().getTime() + 14 * 24 * 60 * 60 * 1000
        ),
        validate: VALIDATE_DATE,
      },
    },
    {
      tableName: "invoice",
    }
  );

  return Invoice;
};
