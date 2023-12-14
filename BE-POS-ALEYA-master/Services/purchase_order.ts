import {Request, Response} from "express";

import db from "Loaders/sequelize";

import {sendDefaultError} from "Utils/error_util";
import {create_po_items, update_po_items} from "Utils/purchase_order_util";
import {dateFilter} from "Utils/time_util";
import {constructDefaultWhere, extractStandardQuery} from "Utils/api_utils";

const PurchaseOrder = db.PurchaseOrder;

export const create_purchase_order = async (req: Request, res: Response) => {
	try {
		const {items, description, supplier} = req.body;

		if (!items || !items?.length) throw new Error("Item tidak boleh kosong");

		const item_names = items.map((row) => row.name).join(",");

		const PO = await PurchaseOrder.create({item_names, description, supplier});
		const {id} = PO;

		await create_po_items(id, items);
		res.send(PO);
	} catch (err) {
		sendDefaultError(res, err);
	}
};

export const get_all_purchase_orders = async (req: Request, res: Response) => {
	try {
		const {date} = req.query;
		const createdAt = dateFilter(date);

		const extractedQuery = extractStandardQuery(req.query);
		const queryFields = ["description", "item_names"];

		let {where, pagination} = constructDefaultWhere(
			extractedQuery,
			queryFields
		);

		where.createdAt = createdAt;

		const purchaseOrders = await PurchaseOrder.findAll({
			where,
			...pagination,
		});

		const totalPurchaseOrder = await PurchaseOrder.count({where});

		return res.status(200).json({purchaseOrders, totalPurchaseOrder});
	} catch (error) {
		return sendDefaultError(res, error);
	}
};

export const get_purchase_order_detail = async (
	req: Request,
	res: Response
) => {
	try {
		const {id} = req.params;
		const where = {id};
		const include = {all: true, nested: true};

		const purchase_order = await PurchaseOrder.findOne({where, include});

		return res.send(purchase_order);
	} catch (err) {
		return sendDefaultError(res, err);
	}
};

export const update_purchase_order = async (req: Request, res: Response) => {
	try {
		const {id, items, description, supplier} = req.body;
		const item_names = items.map((row) => row.name).join(",");
		const where = {id};

		await update_po_items({id, items});

		const PO = await PurchaseOrder.update(
			{description, supplier, item_names},
			{where}
		);

		res.send(PO);
	} catch (err) {
		sendDefaultError(res, err);
	}
};

export const delete_purchase_order = async (req: Request, res: Response) => {
	try {
		const {id} = req.params;
		const where = {id};

		await PurchaseOrder.destroy({where});

		res.send(`Purchase order dengan id : ${id} berhasil dihapus`);
	} catch (err) {
		sendDefaultError(res, err);
	}
};
