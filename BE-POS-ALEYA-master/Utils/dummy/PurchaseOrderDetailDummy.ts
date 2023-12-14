interface iPurchaseOrderDetails {
	[index: number]: {
		id: number;
		qty: number;
		item_name: string;
		item_id: number;
		purchase_order_id: number;
	};
}

const dummy: iPurchaseOrderDetails = [
	{
		id: 1,
		qty: 10,
		item_name: "Keju Kiloan",
		item_id: 2,
		purchase_order_id: 2,
	},
	{
		id: 2,
		qty: 10,
		item_name: "aliquip labore culpa",
		item_id: 5,
		purchase_order_id: 2,
	},
];

export default dummy;
