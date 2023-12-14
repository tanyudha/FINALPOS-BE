interface iLogins {
	[index: number]: {
		id: number;
		ip: string;
		login: Date;
		logout?: Date;
		activity_log?: "Logout" | "Force Logout" | "System Logout";
		user_id: number;
	};
}

const data: iLogins = [
	{
		id: 1,
		ip: "123.123.123.123",
		login: new Date("2021-07-13"),
		logout: new Date("2021-07-14"),
		activity_log: "Force Logout",
		user_id: 2,
	},
	{
		id: 2,
		ip: "123",
		login: new Date(),
		user_id: 1,
	},
];

export default data;
