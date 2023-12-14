require("dotenv").config();
module.exports = {
	development: {
		username: "root",
		password: null,
		database: "moka_yudha",
		host: "127.0.0.1",
		dialect: "mysql",
	},
	test: {
		username: "root",
		password: null,
		database: "database_test",
		host: "127.0.0.1",
		dialect: "mysql",
	},
	production: {
		username: "root",
		password: process.env.SEQUELIZE_PASSWORD,
		database: "db_moka",
		host: "db",
		dialect: "mysql",
	},
};
