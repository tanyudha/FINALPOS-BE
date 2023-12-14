import express from "express";
import { ADMIN, AUTHORIZED, KASIR } from "Utils/role_util";
import { authorized_for } from "Middleware";

import {
  get_invoices,
  get_invoice_detail,
  cancel_invoice,
  pay_invoice,
  delete_invoice,
} from "Services/invoice";

const router = express.Router();

router.get("/all", authorized_for(AUTHORIZED), get_invoices);
router.get("/detail/:id", authorized_for(AUTHORIZED), get_invoice_detail);
router.put("/cancel-invoice", authorized_for(ADMIN), cancel_invoice);
router.put("/pay-invoice", authorized_for([ADMIN, KASIR]), pay_invoice);
router.delete("/delete-invoice/:id", authorized_for(ADMIN), delete_invoice);

export default router;
