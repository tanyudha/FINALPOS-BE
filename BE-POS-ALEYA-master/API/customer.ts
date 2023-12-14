import express from "express";
import {authorized_for} from "Middleware";

import {ADMIN, KASIR, PEGAWAI} from "Utils/role_util";
import {
	get_customers,
	create_customer,
	update_customer,
	delete_customer,
} from "Services/customer";

const router = express.Router();

router.post(
	"/create-customer",
	authorized_for([ADMIN, KASIR, PEGAWAI]),
	create_customer
);
router.get("/", authorized_for([ADMIN, KASIR, PEGAWAI]), get_customers);
router.put(
	"/update-customer",
	authorized_for([ADMIN, KASIR, PEGAWAI]),
	update_customer
);
router.delete(
	"/delete-customer/:id",
	authorized_for([ADMIN, KASIR, PEGAWAI]),
	delete_customer
);

export default router;
