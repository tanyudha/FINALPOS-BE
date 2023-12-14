export default (sequelize, DataTypes) => {
  const PurchaseOrderDetail = sequelize.define(
		"purchase_order_detail",
		{
			qty: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Order tidak boleh kosong",
					},
					isInt: {
						args: true,
						msg: "Order harus berupa bilangan bulat",
					},
					custom(val) {
						if (val < 0) {
							throw new Error("Order harus positif");
						}
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
			tableName: "purchase_order_detail",
		}
	);

	PurchaseOrderDetail.afterBulkCreate(async (instances) => {
		await Promise.all(
			instances.map(async (row) => {
				const where = {id: row.item_id};
				const item = await PurchaseOrderDetail.associations.item.target.findOne(
					{where}
				);
				item.stock = parseInt(item.stock) + parseInt(row.qty);
				await item.save();
			})
		);
	});

  return PurchaseOrderDetail;
};
