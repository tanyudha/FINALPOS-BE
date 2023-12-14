interface iPurchaseOrders {
	[index: number]: {
		id: number;
		supplier: string;
		description: string;
		item_names: string;
		createdAt?: string;
	};
}

const dummy: iPurchaseOrders = [
	{
		id: 1,
		supplier: "Bambang Supply",
		description: "Penambahan susu bear brand",
		item_names: "Bear brand",
	},
	{
		id: 2,
		supplier: "Ahmad Supply",
		description: "Penambahan keju",
		item_names: "Keju kraft",
	},
];

export default dummy;
