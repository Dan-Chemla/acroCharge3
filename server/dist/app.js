"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbUtils_1 = __importDefault(require("./utils/dbUtils"));
const app = express_1.default();
const router = express_1.default.Router();
app.use(cors_1.default());
app.use(express_1.default.json());
//ROUTS:
//Teransaction:
//create a transaction
app.post("/transactions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customer_id, total_price, currency, cerdit_card_type, cerdit_card_number } = req.body;
        const newTreansaction = yield dbUtils_1.default.query("INSERT INTO transaction(customer_id,total_price,currency,cerdit_card_type,cerdit_card_number) VALUES ($1,$2,$3,$4,$5)", [customer_id, total_price, currency, cerdit_card_type, cerdit_card_number]);
        res.json(newTreansaction);
    }
    catch (err) {
        console.error(err.message);
    }
}));
//get all transactions
//get transaction by customer_id
//update a transaction
//delet a transaction
//Customers: 
//create a customer
//get all castomers
//update a customer
//delete a customer
const port = 3001;
app.listen(port, () => {
    console.log("server has started on port: " + port);
});
