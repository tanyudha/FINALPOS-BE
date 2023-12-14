import express from "express";
import { authorized_for } from "Middleware";

import { ADMIN, PO } from "Utils/role_util";
import {
  create_adjustment,
  get_adjustment_detail,
  get_all_adjustments,
  delete_adjustment,
} from "Services/adjustment";

const router = express.Router();

const PO_ROLE = [ADMIN, PO];

router.post("/", authorized_for(PO_ROLE), create_adjustment);
router.get("/", authorized_for(PO_ROLE), get_all_adjustments);
router.get("/:id", authorized_for(PO_ROLE), get_adjustment_detail);
router.delete("/:id", authorized_for(PO_ROLE), delete_adjustment);

export default router;
