import express from "express";
import { authorized_for } from "Middleware";

import { ADMIN, PO } from "Utils/role_util";
import {
	create_purchase_order,
	delete_purchase_order,
	get_all_purchase_orders,
	get_purchase_order_detail,
	update_purchase_order,
} from "Services/purchase_order";

const router = express.Router();

const PO_ROLE = [ADMIN, PO];

router.post("/", authorized_for(PO_ROLE), create_purchase_order);
router.get("/", authorized_for(PO_ROLE), get_all_purchase_orders);
router.get("/:id", authorized_for(PO_ROLE), get_purchase_order_detail);
router.put("/", authorized_for(PO_ROLE), update_purchase_order);
router.delete("/:id", authorized_for(PO_ROLE), delete_purchase_order);

export default router;
