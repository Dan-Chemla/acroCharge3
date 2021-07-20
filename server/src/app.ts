import express from 'express';
import cors from "cors";
import pool from './utils/dbUtils'

const app: express.Application = express();
const router: express.Router = express.Router();

app.use(cors());
app.use(express.json());


//ROUTS:

//Teransaction:
//create a transaction
app.post("/transactions", async (req, res) => {
    try {
        const { customer_id, total_price, currency, cerdit_card_type, cerdit_card_number } = req.body;
        const newTransaction = await pool.query(
            "INSERT INTO transaction(customer_id,total_price,currency,cerdit_card_type,cerdit_card_number) VALUES ($1,$2,$3,$4,$5)",
            [customer_id, total_price, currency, cerdit_card_type, cerdit_card_number]
        );

        res.json(newTransaction)

    } catch (err) {
        console.error(err.message)
    }
});

//get all transactions
app.get("/transactions", async (req, res) => {
    try {
        const allTransactions = await pool.query("SELECT * FROM transaction");
        res.json(allTransactions.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get a transaction
app.get("/transactions/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await pool.query("SELECT * FROM transaction WHERE transaction_id=$1", [id]);
        res.json(transaction.rows[0])
    } catch (err) {
        console.log(err.message)
    }
});

//update a transaction
app.put("/transactions/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { customer_id, total_price, currency, cerdit_card_type, cerdit_card_number } = req.body;
        const updateTransaction = await pool.query(
            "UPDATE transaction SET customer_id = $2, total_price =$3 , currency = $4, cerdit_card_type = $5, cerdit_card_number = $6 WHERE transction_id = $1",
            [id, customer_id, total_price, currency, cerdit_card_type, cerdit_card_number]);

        res.json("transaction was updated!");
    } catch (err) {
        console.error(err.message);
    }
});
//delet a transaction
app.delete("/transactions/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTransaction = await pool.query("DELETE FROM transaction WHERE transction_id = $1", [id]);
        res.json("Transaction was deleted!!");
    } catch (err) {
        console.error(err.message);
    }
});

//Customers: 
//create a customer
app.post("/customers", async (req, res) => {
    try {
        const { customer_id, first_name, last_name, email, gender, country, city, street, phone } = req.body;
        const newCustomer = await pool.query(
            "INSERT INTO customer(ccustomer_id, first_name, last_name, email, gender, country, city, street, phone) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
            [customer_id, first_name, last_name, email, gender, country, city, street, phone]
        );

        res.json(newCustomer)

    } catch (err) {
        console.error(err.message)
    }
});

//get all castomers
app.get("/customers", async (req, res) => {
    try {
        const allCastomers = await pool.query("SELECT * FROM customer");
        res.json(allCastomers.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get a customer
app.get("/customers/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await pool.query("SELECT * FROM customer WHERE customer_id = $1", [id]);
        res.json(customer.rows[0])
    } catch (err) {
        console.log(err.message)
    }
});

//update a customer
app.put("/customers/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { customer_id, first_name, last_name, email, gender, country, city, street, phone } = req.body;
        const updateCustomer = await pool.query(
            "UPDATE customer SET customer_id = $2, first_name =$3 , last_name = $4, email = $5, gender = $6, country= $7, city = $8, street = $9, phone = $10 WHERE transction_id = $1",
            [id, customer_id, first_name, last_name, email, gender, country, city, street, phone]);

        res.json("customer was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

//delete a customer
app.delete("/customers/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCustomer = await pool.query("DELETE FROM customer WHERE customer_id = $1", [id]);
        res.json("customer was deleted!!");
    } catch (err) {
        console.error(err.message);
    }
});

const port: number = 3001

app.listen(port, () => {
    console.log("server has started on port: " + port)
})