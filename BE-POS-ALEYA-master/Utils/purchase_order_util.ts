import db from "Loaders/sequelize";
import {Op} from "sequelize";
import {getIdListFromDocuments} from "./map_util";

const PurchaseOrderDetail = db.PurchaseOrderDetail;

export interface iItem {
	item_id: number;
	item_name: string;
	qty: number;
	purchase_order_id: number;
	change?: number;
}

export const clear_po_items = async (po) => {
	const {id, items} = po;

	const new_ids = getIdListFromDocuments(items);

	const where = {
		purchase_order_id: id,
		id: {
			[Op.not]: new_ids,
		},
	};

	return await PurchaseOrderDetail.destroy({where});
};

export const update_po_items = async (po) => {
	await clear_po_items(po);

	const PODetails = po.items;
	const config = {
		updateOnDuplicate: ["id", "qty"],
		individualHooks: true,
	};

	await PurchaseOrderDetail.bulkCreate(PODetails, config);
};

export const create_po_items = async (purchase_order_id, items) => {
	const PODetails = items.map((row) => {
		return {
			item_name: row.name,
			item_id: row.item_id,
			qty: row.qty,
			purchase_order_id,
		};
	});

	await PurchaseOrderDetail.bulkCreate(PODetails);
};