interface iCustomers {
	[index: number]: {
		id: number;
		name: string;
		phone: string;
		description?: string;
	};
}

const data: iCustomers = [
	{
		id: 1,
		name: "Customer 1",
		phone: "12341234",
	},
	{
		id: 2,
		name: "Customer 2",
		phone: "12351235",
	},
];

export default data;
