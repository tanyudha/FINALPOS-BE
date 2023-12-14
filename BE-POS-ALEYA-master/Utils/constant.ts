export const DEFAULT_PAGE_LIMIT = 20;

export const DEV_CORS = ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"];
export const PROD_CORS = [
	"https://www.sindu.co.id",
	"https://admin.sindu.co.id",
	"https://kurir.sindu.co.id",
];

export const WINSTON_LOG_LEVEL = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	verbose: 4,
	debug: 5,
	silly: 6,
};

export const WINSTON_ERROR_LOG = "logs/error.log";
export const WINSTON_COMBINED_LOG = "logs/combined.log";
