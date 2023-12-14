interface iTransactionDetails {
	[index: number]: {
		id: number;
		qty: number;
		price: number;
		price_sum: number;
		price_final: number;
		price_type: "retail" | "wholesale";
		createdAt: Date;
		transaction_id: number;
		item_id: number;
	};
}

const data: iTransactionDetails = [
	{
		id: 1,
		qty: 1,
		price: 26000,
		price_sum: 26000,
		price_final: 26000,
		price_type: "wholesale",
		createdAt: new Date("2021-07-17"),
		transaction_id: 1,
		item_id: 1,
	},
	{
		id: 2,
		qty: 1,
		price: 64000,
		price_sum: 64000,
		price_final: 54000,
		price_type: "wholesale",
		createdAt: new Date("2021-07-17"),
		transaction_id: 1,
		item_id: 2,
	},
	{
		id: 3,
		qty: 2,
		price: 52000,
		price_sum: 52000,
		price_final: 42000,
		price_type: "wholesale",
		createdAt: new Date("2021-07-17"),
		transaction_id: 2,
		item_id: 1,
	},
	{
		id: 4,
		qty: 2,
		price: 64000,
		price_sum: 64000,
		price_final: 64000,
		price_type: "wholesale",
		createdAt: new Date("2021-07-17"),
		transaction_id: 2,
		item_id: 2,
	},
];

export default data;
