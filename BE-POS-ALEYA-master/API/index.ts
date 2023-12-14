import { Router } from "express";
import auth from "./auth";
import analytics from "./analytics";
import shift from "./shift";
import cart from "./cart";
import invoice from "./invoice";
import item from "./item";
import adjustment from "./adjustment";
import purchase_order from "./purchase_order";
import discount from "./discount";
import transaction from "./transaction";
import customer from "./customer";
import user from "./user";

export default () => {
	const app = Router();

	app.use("/auth", auth);
	app.use("/analytics", analytics);
	app.use("/shift", shift);
	app.use("/cart", cart);
	app.use("/invoice", invoice);
	app.use("/item", item);
	app.use("/adjustment", adjustment);
	app.use("/purchase-order", purchase_order);
	app.use("/discount", discount);
	app.use("/transaction", transaction);
	app.use("/customer", customer);
	app.use("/user", user);

	return app;
};
