import { Request, Response } from "express";

import db from "Loaders/sequelize";

import { sendDefaultError } from "Utils/error_util";
import { constructDefaultWhere, extractStandardQuery } from "Utils/api_utils";
import { create_adjustment_details } from "Utils/adjustment_util";
import { dateFilter } from "Utils/time_util";

const Adjustment = db.Adjustment;

export const create_adjustment = async (req: Request, res: Response) => {
  try {
    const { items, description } = req.body;
    if (!items || !items?.length)
      return sendDefaultError(res, "Item tidak boleh kosong");

    const item_names = items.map((row) => row.name).join(",");
    const item_count = items.length;
    const total_count = items.reduce((a, b) => a + (parseInt(b.qty) || 0), 0);

    const data = await Adjustment.create({
      description,
      item_count,
      item_names,
      total_count,
    });

    await create_adjustment_details(data.id, items);

    return res.send(data);
  } catch (error) {
    return sendDefaultError(res, error);
  }
};

export const get_adjustment_detail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const where = { id };
    const include = { all: true, nested: true };

    const adjustment = await Adjustment.findOne({ where, include });

    return res.send(adjustment);
  } catch (error) {
    return sendDefaultError(res, error);
  }
};

export const get_all_adjustments = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    const createdAt = dateFilter(date);

    const extractedQuery = extractStandardQuery(req.query);
    const queryFields = ["description", "item_names"];
    let { where, pagination } = constructDefaultWhere(
      extractedQuery,
      queryFields
    );

    where.createdAt = createdAt;

    let adjustments = await Adjustment.findAll({
      where,
      ...pagination,
    });

    const totalAdjustment = await Adjustment.count({ where });

    return res.status(200).json({ adjustments, totalAdjustment });
  } catch (error) {
    return sendDefaultError(res, error);
  }
};

export const delete_adjustment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const where = { id };

    await Adjustment.destroy({ where });

    res.send(`Adjustment dengan id: ${id} berhasil dihapus`);
  } catch (err) {
    sendDefaultError(res, err);
  }
};
