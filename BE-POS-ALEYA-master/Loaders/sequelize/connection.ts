import { Sequelize } from "sequelize";

require("dotenv").config();

const sequelize = new Sequelize(
	process.env.SEQUELIZE_DB,
	process.env.SEQUELIZE_USERNAME,
	process.env.SEQUELIZE_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT as any,
		define: {
			timestamps: false,
		},
		dialectOptions: {
			dateStrings: true,
			decimalNumbers: true,
			typeCast: function (field, next) {
				if (field.type === "DATETIME") {
					return field.string();
				}
				return next();
			},
		},
		logging: process.env.SEQUELIZE_LOGGING === "1",
		timezone: "+07:00",
		port: parseInt(process.env.PORT_DB),
	}
);

export default sequelize;
