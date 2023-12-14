import express from "express";
import { authorized_for } from "Middleware";

import { AUTHORIZED, KASIR } from "Utils/role_util";
import {
	delete_transaction,
	get_transactions,
	get_transaction_detail,
	refund_transaction,
} from "Services/transaction";

const router = express.Router();

router.get("/", authorized_for(AUTHORIZED), get_transactions);
router.get("/detail/:id", authorized_for(AUTHORIZED), get_transaction_detail);
router.post("/refund/:id", authorized_for(KASIR), refund_transaction);
router.delete("/delete-transaction/:id", authorized_for(AUTHORIZED), delete_transaction);

export default router;
