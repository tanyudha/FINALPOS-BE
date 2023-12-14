import express from "express";
import { authorized_for } from "Middleware";

import { ADMIN, AUTHORIZED } from "Utils/role_util";
import {
  get_all_users,
  get_all_cashier,
  get_all_employee,
  create_user,
  update_user,
  delete_user,
  get_user,
} from "Services/user";

const router = express.Router();

router.get("/", authorized_for(AUTHORIZED), get_all_users);
router.get("/cashier", authorized_for(ADMIN), get_all_cashier);
router.get("/employee", authorized_for(ADMIN), get_all_employee);
router.get("/:id", authorized_for(ADMIN), get_user);
router.post("/", authorized_for(ADMIN), create_user);
router.put("/", authorized_for(ADMIN), update_user);
router.delete("/:id", authorized_for(ADMIN), delete_user);

export default router;
