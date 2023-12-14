import { Request, Response } from "express";
import { Op } from "sequelize";

import db from "Loaders/sequelize";

import { sendDefaultError } from "Utils/error_util";
import { constructDefaultWhere, extractStandardQuery } from "Utils/api_utils";

const Item = db.Item;

export const create_item = async (req: Request, res: Response) => {
  const { name, stock, price_retail, price_wholesale, description } = req.body;
  const isNameUsed = await Item.findOne({ where: { name } });
  if (isNameUsed) {
    sendDefaultError(res, "Item dengan nama yang sama sudah ada");
    return;
  }
  try {
    const item = await Item.create({
      name,
      stock,
      price_retail,
      price_wholesale,
      description,
    });
    res.status(200).json(item);
  } catch (error) {
    sendDefaultError(res, error);
  }
};

export const update_item = async (req: Request, res: Response) => {
  const { id, name, stock, price_retail, price_wholesale, description } =
    req.body;

  try {
    const where = { id };
    const item = await Item.findOne({ where });

    if (!item)
      res.status(404).json({
        status: "not found",
        message: "Barang dengan id ini tidak ditemukan",
      });

    // if the name is changed
    if (item.name !== name) {
      const whereSameItem = {
        [Op.and]: [{ name }, { id: { [Op.ne]: id } }],
      };
      const sameName = await Item.findOne({ where: whereSameItem });
      if (!!sameName) {
        sendDefaultError(res, "Barang dengan nama yang sama sudah ada");
        return;
      }
    }

    const updatedItem = await Item.update(
      {
        name,
        stock,
        price_retail,
        price_wholesale,
        description,
      },
      { returning: true, plain: true, where }
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    sendDefaultError(res, error);
  }
};

export const get_item = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const item = await Item.findOne({ where: { id } });
    if (!item)
      res.status(404).json({
        status: "not found",
        message: "Barang dengan id ini tidak ditemukan",
      });
    res.status(200).json(item);
  } catch (error) {
    sendDefaultError(res, error);
  }
};

export const get_all_items = async (req, res: Response) => {
  const extractedQuery = extractStandardQuery(req.query);
  const queryFields = ["name"];
  const { where, pagination } = constructDefaultWhere(
    extractedQuery,
    queryFields
  );
  const order = ["name", "ASC"];

  try {
    const items = await Item.findAll({
      where,
      order: [order],
      ...pagination,
    });
    const totalItems = await Item.count({ where });

    res.status(200).json({ items, totalItems });
  } catch (error) {
    sendDefaultError(res, error);
  }
};

export const find_items = async (req: Request, res: Response) => {
  const { query } = req.query;
  const number = +query || undefined;

  try {
    const items = await Item.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.substring]: query,
            },
          },
          {
            stock: {
              [Op.eq]: number,
            },
          },
          {
            price_retail: {
              [Op.eq]: number,
            },
          },
          {
            price_wholesale: {
              [Op.eq]: number,
            },
          },
        ],
      },
    });

    res.status(200).json(items);
  } catch (error) {
    sendDefaultError(res, error);
  }
};

export const delete_item = async (req, res: Response) => {
  try {
    const { id } = req.params;
    const where = { id };
    if (!id) throw new Error("ID item tidak boleh kosong!");
    await Item.destroy({ where });
    res.send("Item berhasil dihapus!");
  } catch (err) {
    sendDefaultError(res, err);
  }
};
