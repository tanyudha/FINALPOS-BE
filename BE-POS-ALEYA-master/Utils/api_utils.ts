import {Op} from "sequelize";
import {DEFAULT_PAGE_LIMIT} from "./constant";

interface iWhere {
	[name: string]: any;
}

export const extractStandardQuery = (req_query) => {
	let {page = 0, limit = DEFAULT_PAGE_LIMIT, query = ""} = req_query;
	page = parseInt(page);
	limit = parseInt(limit);
	let offset = limit * page;
	return {
		page,
		limit,
		offset,
		query,
	};
};

export const constructDefaultWhere = (
	{limit = undefined, offset = undefined, query = undefined},
	query_fields
) => {
	let where: iWhere = {};

	if (query && query_fields.length) {
		const filters = query_fields.map((f) => {
			return {
				[f]: {[Op.substring]: query},
			};
		});
		where = {
			[Op.or]: filters,
		};
	}

	let pagination: iWhere = {};

	if (limit) pagination.limit = limit;
	if (offset) pagination.offset = offset;

	return {where, pagination};
};
