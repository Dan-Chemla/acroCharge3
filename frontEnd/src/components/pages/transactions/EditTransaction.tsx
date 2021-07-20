import React, { useState } from 'react';

interface IProps {
    transaction: {
        transction_id: number
        customer_id: string
        total_price: number
        currency: string
        cerdit_card_type: string
        cerdit_card_number: string
    }
}


const EditTransaction: React.FC<IProps> = ({ transaction }) => {

    const [tarns, setTrans] = useState<IProps["transaction"]>(transaction)


    const updateTransaction = async () => {
        try {
            const body = { ...tarns }

            const response = await fetch(`http://localhost:3001/transactions/${transaction.transction_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

        } catch (err) {
            console.error(err)
        }
    }
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTrans({
            ...tarns,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>

            <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id${transaction.transction_id}`}>
                Edit
</button>

            <div className="modal" id={`id${transaction.transction_id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Transaction</h4>
                            <button type="button" className="close" data-dismiss="modal" >&times;</button>
                        </div>

                        <div className="modal-body form-group">
                            <input
                                className="form-control"
                                type="text"
                                value={tarns.customer_id}
                                onChange={onChangeInput}
                                name="customer_id"
                            />
                            <input
                                className="form-control"
                                type="number"
                                value={tarns.total_price}
                                onChange={onChangeInput}
                                name="total_price"
                            />
                            <input
                                className="form-control"
                                type="text"
                                value={tarns.currency}
                                onChange={onChangeInput}
                                name="currency"
                            />
                            <input
                                className="form-control"
                                type="text"
                                value={tarns.cerdit_card_type}
                                onChange={onChangeInput}
                                name="erdit_card_type"
                            />
                            <input
                                className="form-control"
                                type="text"
                                value={tarns.cerdit_card_number}
                                onChange={onChangeInput}
                                name="cerdit_card_number"
                            />
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e => updateTransaction()} >Edit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setTrans(transaction)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditTransaction;