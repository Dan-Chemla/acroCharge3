import React, { useEffect, useState } from 'react';

import EditTransaction from './EditTransaction'


interface State {
    transaction: {
        transction_id: number
        customer_id: string
        total_price: number
        currency: string
        cerdit_card_type: string
        cerdit_card_number: string
    }[]
}



const TransactionList = () => {

    const [transactions, setTransactions] = useState<State["transaction"]>([]);


    const deleteTransaction = async (id: number) => {
        try {
            const deleteTransaction = await fetch(`http://localhost:3001/transactions/${id}`, {
                method: "DELETE"
            });
            setTransactions(transactions.filter(trans => trans.transction_id !== id));
        } catch (err) {
            console.error(err);
        }
    }

    const getTransactions = async () => {
        try {
            const res = await fetch("http://localhost:3001/transactions");
            const jsonData = await res.json();
            setTransactions(jsonData);

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getTransactions();
    }, [])

    return (
        <div>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>CustomerId</th>
                        <th>Total Price</th>
                        <th>Currency</th>
                        <th>Credit Card Type</th>
                        <th>Credit Card Number</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(trans => (
                        <tr key={trans.transction_id}>
                            <td>{trans.customer_id}</td>
                            <td>{trans.total_price}</td>
                            <td>{trans.currency}</td>
                            <td>{trans.cerdit_card_type}</td>
                            <td>{trans.cerdit_card_number}</td>
                            <td>
                                <EditTransaction transaction={trans} />
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteTransaction(trans.transction_id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TransactionList;