import express from "express";
import { authorized_for } from "Middleware";
import { create_cart, update_cart, get_carts, get_cart_detail } from "Services/cart";

const router = express.Router();

router.get("/all-cart", authorized_for(["Kasir", "Pegawai"]), get_carts);
router.get("/detail/:id", authorized_for(["Kasir", "Pegawai"]), get_cart_detail);
router.post("/create-cart", authorized_for(["Kasir", "Pegawai"]), create_cart);
router.put("/update-cart", authorized_for(["Kasir", "Pegawai"]), update_cart);

export default router;
