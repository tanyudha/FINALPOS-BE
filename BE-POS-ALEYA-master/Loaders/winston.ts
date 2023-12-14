import winston from "winston";
import { WINSTON_COMBINED_LOG, WINSTON_ERROR_LOG } from "Utils/constant";

const { combine, timestamp, colorize, printf } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {
	return `(${timestamp}) [${level}]: ${message}`;
});

const logger = winston.createLogger({
	format: combine(timestamp(), colorize(), myFormat),
	transports: [
		new winston.transports.File({ filename: WINSTON_ERROR_LOG, level: "error" }),
		new winston.transports.File({ filename: WINSTON_COMBINED_LOG }),
	],
});

if (process.env.NODE_ENV !== "production") {
	logger.add(
		new winston.transports.Console({
			format: myFormat,
		})
	);
}

export default logger;
