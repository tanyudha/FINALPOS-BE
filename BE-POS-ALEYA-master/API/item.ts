import express from "express";
import { authorized_for } from "Middleware";

import { ADMIN, PO, AUTHORIZED } from "Utils/role_util";
import {
  create_item,
  update_item,
  get_item,
  get_all_items,
  find_items,
  delete_item,
} from "Services/item";

const router = express.Router();

const PO_ROLE = [ADMIN, PO];

router.post("/create-item", authorized_for(PO_ROLE), create_item);
router.put("/update-item", authorized_for(PO_ROLE), update_item);
router.get("/get-item/:id", authorized_for(AUTHORIZED), get_item);
router.get("/get-all-items", authorized_for(AUTHORIZED), get_all_items);
router.get("/find-items", authorized_for(AUTHORIZED), find_items);
router.delete("/delete/:id", authorized_for(PO_ROLE), delete_item);

export default router;
