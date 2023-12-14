interface iUsers {
	[index: number]: {
		id: number;
		username: string;
		name: string;
		password: string;
		role: "Admin" | "Kasir" | "Pegawai";
	};
}

const data: iUsers = [
	{
		id: 1,
		username: "admin",
		name: "admin",
		password : "password",
		// password: "$2a$12$hnX47llNAGOknVpgpo1S9O0TGw5BaPM2vPgx2l2FK86s2/YQFxcQe", //password
		role: "Admin",
	},
	{
		id: 2,
		username: "pegawai",
		name: "nama pegawai",
		password : "password",
		// password: "$2a$12$hnX47llNAGOknVpgpo1S9O0TGw5BaPM2vPgx2l2FK86s2/YQFxcQe", //password
		role: "Pegawai",
	},
	{
		id: 3,
		username: "kasir",
		name: "nama kasir",
		password : "password",
		// password: "$2a$12$hnX47llNAGOknVpgpo1S9O0TGw5BaPM2vPgx2l2FK86s2/YQFxcQe", //password
		role: "Kasir",
	},
	{
		id: 4,
		username: "kasir2",
		name: "nama kasir2",
		password : "password",
		// password: "$2a$12$hnX47llNAGOknVpgpo1S9O0TGw5BaPM2vPgx2l2FK86s2/YQFxcQe", //password
		role: "Kasir",
	},
];

export default data;
