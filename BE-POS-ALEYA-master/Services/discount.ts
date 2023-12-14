import {Request, Response} from "express";
import db from "Loaders/sequelize";
import {Op} from "sequelize";
import {sendDefaultError} from "Utils/error_util";

const Discount = db.Discount;

export const get_discounts = async (req, res: Response) => {
	try {
		let where: any = {};
		const {query = ""} = req.query;
		if (req.user === "Kasir") where.is_active = true;
		if (query !== "") where.name = {[Op.substring]: query};

		const discounts = await Discount.findAll({where});
		const totalDiscounts = await Discount.count({where});

		res.send({discounts, totalDiscounts});
	} catch (err) {
		res.status(401).json({
			status: "failed",
			message: err.message,
		});
	}
};

export const get_discount_detail = async (req, res: Response) => {
	try {
		const {id} = req.params;
		const where = {id};
		const discount = await Discount.findOne({where});
		res.send(discount);
	} catch (err) {
		sendDefaultError(res, err);
	}
};

export const create_discount = async (req, res: Response) => {
	try {
		const {name, is_percentage, amount, percentage, is_active} = req.body;

		const discount = await Discount.create({
			name,
			is_percentage,
			amount,
			percentage,
			is_active,
		});

		res.send(discount);
	} catch (err) {
		res.status(401).json({
			status: "failed",
			message: err.message,
		});
	}
};

export const update_discount = async (req, res: Response) => {
	try {
		const {id, name, is_percentage, amount, percentage, is_active} = req.body;

		const where = {id};

		const discount = await Discount.update(
			{name, is_percentage, amount, percentage, is_active},
			{where}
		);

		res.send(discount);
	} catch (err) {
		res.status(401).json({
			status: "failed",
			message: err.message,
		});
	}
};

export const delete_discount = async (req, res: Response) => {
	try {
		const {id} = req.params;

		const where = {id};

		await Discount.destroy({where});

		res.send("Data berhasil dihapus");
	} catch (err) {
		res.status(401).json({
			status: "failed",
			message: err.message,
		});
	}
};
