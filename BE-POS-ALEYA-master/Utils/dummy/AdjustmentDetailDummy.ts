interface iAdjustmentDetail {
	[index: number]: {
		id: number;
		item_name: string;
		change: number;
		qty: number;
		adjustment_id: number;
		item_id: number;
	};
}

const data: iAdjustmentDetail = [
	{
		id: 1,
		item_name: "Keju",
		change: 10,
		qty: 100,
		adjustment_id: 1,
		item_id: 2,
	},
	{
		id: 2,
		item_name: "Bear brand",
		change: 10,
		qty: 100,
		adjustment_id: 1,
		item_id: 12,
	},
	{
		id: 3,
		item_name: "Keju",
		change: 10,
		qty: 110,
		adjustment_id: 2,
		item_id: 2,
	},
];

export default data;
