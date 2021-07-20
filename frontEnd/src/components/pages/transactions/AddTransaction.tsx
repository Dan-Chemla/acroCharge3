import React, { useState, useEffect } from 'react';

interface IState {
    transaction: {
        customer_id: string
        total_price: number
        currency: string
        cerdit_card_type: string
        cerdit_card_number: string
    },
    customers: {
        customer_id: string
        first_name: string
        last_name: string
        email: string
        gender: string
        country: string
        city: string
        street: string
        phone: string
    }[]
}


const AddTransaction = () => {
    const emptyTransiction = {
        customer_id: "",
        total_price: 0,
        currency: "",
        cerdit_card_type: "",
        cerdit_card_number: ""
    }
    const [transaction, setTransaction] = useState(emptyTransiction);

    const [customers, setCustomers] = useState<IState["customers"]>([])

    const getCustomers = async () => {
        try {
            const res = await fetch("http://localhost:3001/customers");
            const jsonData = await res.json();
            setCustomers(jsonData);

        } catch (err) {
            console.error(err)
        }
    };

    const addTransaction = async () => {
        try {
            const body = { ...transaction }
            const response = await fetch("http://localhost:3001/transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
        } catch (err) {
            console.log(err)
        }
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        getCustomers();
    }, []);

    return (
        <>
 <h1 className="text-center mt-5">Transactions</h1>
            <button type="button" className="btn btn-primary mt-5" data-toggle="modal" data-target="#AddTransaction">
                + Add Transaction +
            </button>

            <div className="modal" id="AddTransaction" >
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Add Transiction</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={() => setTransaction(emptyTransiction)}>&times;</button>
                        </div>
                        <div className="modal-body form-group">
                            <select
                                className="form-control"
                                value={transaction.customer_id}
                                onChange={onChangeInput}
                                name="customer_id">
                                {customers.map(cust =>
                                    <option value={cust.customer_id} key={cust.customer_id}>
                                        {cust.customer_id}
                                    </option>)}
                                <option value="" key="0" selected>select customer</option>
                            </select>
                            <input
                                className="form-control"
                                type="number"
                                value={transaction.total_price}
                                placeholder="price"
                                onChange={onChangeInput}
                                name="total_price"
                            />
                            <input
                                className="form-control"
                                type="text"
                                value={transaction.currency}
                                placeholder="currncy"
                                onChange={(onChangeInput)}
                                name="currency"
                            />
                            <input
                                className="form-control"
                                type="text"
                                value={transaction.cerdit_card_type}
                                placeholder="credit card type"
                                onChange={onChangeInput}
                                name="cerdit_card_type"
                            />
                            <input
                                className="form-control"
                                type="text"
                                value={transaction.cerdit_card_number}
                                onChange={onChangeInput}
                                placeholder="credit card number"
                                name="cerdit_card_number"
                            />
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => addTransaction()} >Submit</button>
                            <button type="button" className="btn btn-danger" onClick={() => setTransaction(emptyTransiction)}>Clear</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )


}

export default AddTransaction;