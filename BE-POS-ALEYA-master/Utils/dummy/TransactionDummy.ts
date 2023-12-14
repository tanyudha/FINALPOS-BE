interface iTransactions {
	[index: number]: {
		id: number;
		customer_name: string;
		customer_phone: number;
		cashier_name: string;
		employee_name: string;
		total: number;
		createdAt: Date;
		transaction_method: "Cart" | "Transfer" | "Cash" | "Invoice";
		invoice_payment_method?: "Cash" | "Transfer";
		invoice_status?: "Paid" | "Unpaid" | "Cancelled";
		invoice_due_date?: Date;
		customer_id: number;
		employee_id: number;
		cashier_id?: number;
		shift_id: number;
	};
}

const data: iTransactions = [
	{
		id: 1,
		customer_name: "Bambang",
		customer_phone: 12341234,
		cashier_name: "kasir",
		employee_name: "pegawai",
		total: 80000,
		createdAt: new Date("2021-07-17"),
		transaction_method: "Invoice",
		customer_id: 1,
		employee_id: 2,
		cashier_id: 3,
		shift_id: 1,
	},
	{
		id: 2,
		cashier_name: "Bambang",
		customer_name: "Bambang",
		customer_phone: 12341234,
		employee_name: "pegawai",
		createdAt: new Date("2021-07-17"),
		transaction_method: "Cart",
		total: 800,
		customer_id: 1,
		employee_id: 2,
		shift_id: 1,
	},
];

export default data;
