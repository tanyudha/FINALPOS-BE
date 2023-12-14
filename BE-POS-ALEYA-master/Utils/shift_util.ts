import db from "Loaders/sequelize";

const Shift = db.Shift;
const Transaction = db.Transaction;
const Invoice = db.Invoice;
const Expense = db.Expense;

export const isShiftValid = async ({cashier_id, id}) => {
	const ending_shift = null;
	const where = {id, ending_shift, cashier_id};

	const shift = await Shift.findOne({where});

	return shift !== null;
};

export const updateShiftExpense = async ({id, expenses}) => {
	const shift_id = id;
	expenses.map(async (expense) => {
		const {judul, deskripsi, total} = expense;
		await Expense.create({judul, deskripsi, total, shift_id});
	});
};

export const calculateEndShift = async (shift_id) => {
	const where = {shift_id};
	const transactions = await Transaction.findAll({where, include: Invoice});

	let cash_from_transaction = 0,
		cash_from_invoice = 0,
		transfer_from_transaction = 0,
		transfer_from_invoice = 0;

	await transactions.map((t) => {
		const {total} = t;
		switch (t.transaction_method) {
			case "Cart":
				break;
			case "Transfer":
				transfer_from_transaction += parseInt(total);
				break;
			case "Cash":
				cash_from_transaction += parseInt(total);
				break;
			case "Invoice":
				if (!t.invoice) break;
				switch (t.invoice.invoice_payment_method) {
					case "Transfer":
						transfer_from_invoice += parseInt(total);
						break;
					case "Cash":
						cash_from_invoice += parseInt(total);
						break;
				}
				break;
		}
	});

	return {
		cash_from_transaction,
		cash_from_invoice,
		transfer_from_transaction,
		transfer_from_invoice,
	};
};