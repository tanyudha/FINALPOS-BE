import db from "Loaders/sequelize";

const AdjustmentDetail = db.AdjustmentDetail;
const Item = db.Item;

export interface iItem {
	item_id: number;
	item_name: string;
	qty: number;
	adjustment_id: number;
	change?: number;
}

export const create_adjustment_details = async (adjustment_id, items) => {
	const adjustment_details = items.map((row) => {
		return {
			qty: row.qty,
			item_name: row.item_name,
			adjustment_id,
			item_id: row.item_id,
		};
	});

	await AdjustmentDetail.bulkCreate(adjustment_details);
};