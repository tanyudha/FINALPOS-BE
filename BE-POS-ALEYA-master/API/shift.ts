import express from "express";
import { authorized_for } from "Middleware";
import {
  get_active_shift,
  create_shift,
  end_shift,
  get_all_shift,
  add_expenses,
  get_shift_detail,
  is_cashier_available,
  get_dashboard_info,
} from "Services/shift";

const router = express.Router();

router.get("/all-shift", authorized_for("Admin"), get_all_shift);
router.get("/dashboard-info", authorized_for("Admin"), get_dashboard_info);
router.get("/get-active-shift", authorized_for("Kasir"), get_active_shift);
router.post("/create-shift", authorized_for("Kasir"), create_shift);
router.post("/add-expense", authorized_for("Kasir"), add_expenses);
router.post("/end-shift", authorized_for("Kasir"), end_shift);
router.get("/detail/:id", authorized_for(["Admin", "Kasir"]), get_shift_detail);
router.get(
  "/is-cashier-available",
  authorized_for("Pegawai"),
  is_cashier_available
);
// router.get("/test/:id", authorized_for(ADMIN), test);

export default router;
