import expressLoader from "./express";
import sequelizeLoader from "./sequelize";
import cronLoader from "./cron";
import logger from "./winston";

export default async ({ expressApp }) => {
	try {
		await expressLoader({ app: expressApp });
		logger.info("✌️ Express loaded");

		if (process.env.LOAD_DUMMY === "1") {
			await sequelizeLoader.conn.sync({ force: true });
			await sequelizeLoader.insertDummy();
			logger.info("SQL DUMMY LOADED!");
		}

		cronLoader();
		logger.info("✌️ Sequelize loaded");
		logger.info("✌️ Cron loaded!");
	} catch (err) {
		logger.error(err);
	}
};
