import {VALIDATE_DATE} from "Utils/model_validation_util";

export default (sequelize, DataTypes) => {
	const AuthHistory = sequelize.define(
		"auth_history",
		{
			ip: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			login: {
				type: DataTypes.DATE,
				allowNull: false,
				default: sequelize.NOW,
				validate: VALIDATE_DATE,
			},
			logout: {
				type: DataTypes.DATE,
				allowNull: true,
				validate: VALIDATE_DATE,
			},
			activity_log: {
				type: DataTypes.ENUM("Logout", "Force Logout", "System Logout"),
				validate: {
					isIn: {
						args: [["Logout", "Force Logout", "System Logout"]],
						msg: "Activity log harus berupa 'Logout', 'Force Logout', atau 'Sistem Logout'",
					},
				},
			},
		},
		{
			tableName: "auth_history",
		}
	);

	return AuthHistory;
};
