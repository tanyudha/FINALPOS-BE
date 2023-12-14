interface iInvoices {
	[index: number]: {
		id: number;
		invoice_payment_method?: "Cash" | "Transfer";
		invoice_status?: "Paid" | "Unpaid" | "Cancelled";
		invoice_due_date?: Date;
		createdAt?: Date;
		paidAt?: Date;
		transaction_id: number;
	};
}

const data: iInvoices = [
	{
		id: 1,
		transaction_id: 1,
	},
];

export default data;
