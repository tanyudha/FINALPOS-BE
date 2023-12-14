interface iDiscount {
	[index: number]: {
		id: number;
		name: string;
		is_percentage: boolean;
		amount?: number;
		percentage?: number;
		is_active: boolean;
	};
}

const data: iDiscount = [
	{
		id: 1,
		name: "Diskon 10k",
		is_percentage: false,
		amount: 10000,
		is_active: true,
	},
	{
		id: 2,
		name: "Diskon 10%",
		is_percentage: true,
		percentage: 10,
		is_active: true,
	},
];

export default data;
