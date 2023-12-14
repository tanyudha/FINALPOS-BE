import { Request, Response } from "express";
import { Op } from "sequelize";

import db from "Loaders/sequelize";
import { sendDefaultError } from "Utils/error_util";
import { dateFilter } from "Utils/time_util";
import sequelize from "Loaders/sequelize/connection";

const Item = db.Item;
const Transaction = db.Transaction;
const TransactionDetail = db.TransactionDetail;

interface iWhere {
	[name: string]: any;
}

export const get_transactions = async (req, res: Response) => {
	const {
		id,
		cashier_id,
		employee_id,
		customer_id,
		transaction_method,
		createdAt,
		with_cart = false,
		with_invoice = false,
		page = 0,
		limit = 100,
		query = "",
	} = req.query;

	let where: iWhere = {};
	const transactionMethod = [];
	if (id) where.id = id;
	if (cashier_id) where.cashier_id = cashier_id;
	if (customer_id) where.customer_id = customer_id;
	if (employee_id) where.employee_id = employee_id;
	if (!with_cart) transactionMethod.push({ [Op.not]: "Cart" });
	if (!with_invoice) transactionMethod.push({ [Op.not]: "Invoice" });
	if (transaction_method) {
		if (transaction_method === "Invoice") where.is_invoice = true;
		else transactionMethod.push({ [Op.like]: transaction_method });
	}
	if (createdAt) where.createdAt = dateFilter(createdAt);
	if (transactionMethod.length) {
		where.transaction_method = {
			[Op.and]: transactionMethod,
		};
	}

	if (query) {
		const substring = { [Op.substring]: query };
		where = {
			...where,
			[Op.or]: [
				{ customer_name: substring },
				{ id: substring },
				{ cashier_name: substring },
				{ employee_name: substring },
			],
		};
	}

	const order = ["createdAt", "DESC"];

	try {
		let pagination: any = {};
		if (limit && parseInt(limit)) {
			pagination.limit = parseInt(limit);
			if (page && parseInt(page)) {
				pagination.offset = parseInt(limit) * parseInt(page);
			}
		}
		const transactions = await Transaction.findAll({
			where,
			order: [order],
			...pagination,
		});
		const totalItems = await Transaction.count({ where });

		res.send({ transactions, totalItems });
	} catch (err) {
		sendDefaultError(res, err);
	}
};

export const get_transaction_detail = async (req, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) throw new Error("id tidak boleh kosong!");

		const where = { id };
		const include = { all: true, nested: true };

		const data = await Transaction.findOne({ where, include });

		res.send(data);
	} catch (err) {
		sendDefaultError(res, err);
	}
};

export const refund_transaction = async (req, res: Response) => {
	try {
		const { id } = req.params;
		if (!id) throw new Error("id tidak boleh kosong!");

		const result = await sequelize.transaction(async (t) => {
			const where = { id };

			const data = await Transaction.findOne({ where }, { transaction: t });

			if (data.status === "refunded") throw new Error("Transaksi sudah pernah di refund!");

			data.status = "refunded";
			data.refundedAt = new Date();

			await data.save({ transaction: t });

			const whereTD = { transaction_id: id };
			const tds = await TransactionDetail.findAll({ where: whereTD }, { transaction: t });

			await Promise.all(
				tds.map(async (row) => {
					const where = { id: row.item_id };
					const td = await Item.findOne({ where }, { transaction: t });
					td.stock = parseInt(td.stock) + parseInt(row.qty);
					await td.save({ transaction: t });
					return td;
				})
			);

			return data;
		});

		res.status(200).json(result);
	} catch (err) {
		sendDefaultError(res, err);
	}
};

export const delete_transaction = async (req, res: Response) => {
	try {
		const { id } = req.params;
		const where = { id };

		await Transaction.destroy({ where });

		res.send("Success");
	} catch (err) {
		sendDefaultError(res, err);
	}
};
