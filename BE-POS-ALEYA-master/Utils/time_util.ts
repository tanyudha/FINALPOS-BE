import { Op } from "sequelize";

export const currentTime = () => {
	const offsetFromUTC = 0 * 3600 * 1000;
	return new Date(new Date().getTime() + offsetFromUTC);
};

export const currentDate = () => {
	const defaultTime = currentTime();
	const date = new Date(
		`${defaultTime.getFullYear()}-${defaultTime.getMonth() + 1}-${defaultTime.getDate()}`
	);
	return date;
};

export const dateFilter = (data) => {
	if (!data) data = currentTime();
	const { day, month, year } = parseDate(data);

	const defaultTime = currentTime();
	const defaultDay = new Date(
		`${defaultTime.getFullYear()}-${defaultTime.getMonth() + 1}-${defaultTime.getDate()}`
	);

	const date = day && month && year ? new Date(`${year}-${month}-${day}`) : defaultDay;

	return {
		[Op.gte]: date,
		[Op.lt]: new Date(date.getTime() + 24 * 60 * 60 * 1000),
	};
};

export const dateRangeFilter = (date1, date2) => {
	const first = parseDate(date1);
	const second = parseDate(date2);

	const start = new Date(`${first.year}-${first.month}-${first.day}`);
	const end = new Date(`${second.year}-${second.month}-${second.day}`);

	end.setDate(end.getDate() + 1);

	return {
		[Op.gte]: start,
		[Op.lt]: end,
	};
};

export const parseDate = (date) => {
	if (!date) return null;

	const data = new Date(date);
	const day = data.getDate();
	const month = data.getMonth() + 1;
	const year = data.getFullYear();

	return { day, month, year };
};
