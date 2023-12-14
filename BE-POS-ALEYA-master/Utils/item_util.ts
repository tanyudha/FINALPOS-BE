import db from "Loaders/sequelize";

const Item = db.Item;

export const get_item = async (id) => {
  const res = await Item.findByPk(id);
  if (!res) throw new Error("Barang tidak ditemukan atau sudah dihapus");
  else return res;
};
