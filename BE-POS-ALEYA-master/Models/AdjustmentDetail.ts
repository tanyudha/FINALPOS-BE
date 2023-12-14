export default (sequelize, DataTypes) => {
  const AdjustmentDetail = sequelize.define(
		"adjustment_detail",
		{
			qty: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Stok baru tidak boleh kosong",
					},
					isInt: {
						args: true,
						msg: "Stok baru hanya boleh diisi dengan angka",
					},
				},
			},
			item_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Nama barang tidak boleh kosong",
					},
				},
			},
		},
		{
			table_name: "adjustment_detail",
		}
	);

	AdjustmentDetail.afterBulkCreate(async (instances) => {
		await Promise.all(
			instances.map(async (row) => {
				const where = {id: row.item_id};
				const item = await AdjustmentDetail.associations.item.target.findOne({
					where,
				});
				item.stock = parseInt(row.qty);
				await item.save();
			})
		);
	});

  return AdjustmentDetail;
};
