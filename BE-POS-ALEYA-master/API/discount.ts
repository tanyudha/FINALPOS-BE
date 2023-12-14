import express from "express";
import {authorized_for} from "Middleware";

import {ADMIN, KASIR, PEGAWAI} from "Utils/role_util";
import {
	get_discounts,
	create_discount,
	update_discount,
	delete_discount,
	get_discount_detail,
} from "Services/discount";

const router = express.Router();

router.post("/create-discount", authorized_for(ADMIN), create_discount);
router.get("/", authorized_for([ADMIN, KASIR, PEGAWAI]), get_discounts);
router.get("/:id", authorized_for([ADMIN]), get_discount_detail);
router.put("/update-discount", authorized_for(ADMIN), update_discount);
router.delete("/delete-discount/:id", authorized_for(ADMIN), delete_discount);

export default router;
