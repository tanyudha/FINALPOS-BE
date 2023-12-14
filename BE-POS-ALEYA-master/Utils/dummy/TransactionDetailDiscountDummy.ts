interface iTransactionDetailDiscounts {
	[index: number]: {
		transaction_detail_id: number;
		discount_id: number;
	};
}

const data: iTransactionDetailDiscounts = [
	{
		transaction_detail_id: 2,
		discount_id: 1,
	},
	{
		transaction_detail_id: 3,
		discount_id: 1,
	},
];

export default data;
