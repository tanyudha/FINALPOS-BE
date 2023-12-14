interface iAdjustment {
	[index: number]: {
		id: number;
		description?: string;
		item_names?: string;
		item_count: number;
		total_count: number;
	};
}

const data: iAdjustment = [
	{
		id: 1,
		description: "Stok PPKM",
		item_names: "Bear brand, Keju",
		item_count: 2,
		total_count: 20,
	},
	{
		id: 2,
		description: "Stok Keju PPKM",
		item_names: "Keju",
		item_count: 1,
		total_count: 10,
	},
];

export default data;
