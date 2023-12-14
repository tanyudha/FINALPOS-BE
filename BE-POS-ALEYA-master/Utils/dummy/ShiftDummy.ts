interface iShifts {
	[index: number]: {
		id: number;
		cashier_name: string;
		starting_cash: number;
		cash_sales?: number;
		cash_from_invoice?: number;
		expected_ending_cash?: number;
		starting_shift: Date;
		ending_shift?: Date;
		cashier_id: number;
	};
}

const data: iShifts = [
	{
		id: 1,
		cashier_name: "nama kasir",
		starting_cash: 100000,
		cash_sales: 50000,
		cash_from_invoice: 250000,
		expected_ending_cash: 300000,
		starting_shift: new Date("2021-07-13"),
		ending_shift: new Date("2021-07-14"),
		cashier_id: 3,
	},
	{
		id: 2,
		cashier_name: "nama kasir",
		starting_cash: 100000,
		starting_shift: new Date("2021-07-13"),
		cashier_id: 3,
	},
];

export default data;
