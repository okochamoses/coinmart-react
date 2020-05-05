import React from 'react';
import { Card, CardBody, Table, Button } from 'reactstrap';

const Orders = ({ transactions }) => {
    return (
        <Card>
            <CardBody className="pb-0">
                <h5 className="card-title mt-0 mb-0 header-title">Recent Transactions</h5>

                <Table hover responsive className="mt-4">
                    <thead>
                        <tr>
                            <th scope="col">Transaction Ref</th>
                            <th scope="col">Asset</th>
                            <th scope="col">Form</th>
                            <th scope="col">Type</th>
                            <th scope="col">Units</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((txn, idx) => (
                            <tr key={idx}>
                                <td>{txn.reference}</td>
                                <td>{txn.asset}</td>
                                <td>{txn.txnForm}</td>
                                <td>{txn.txnType}</td>
                                <td>{txn.units}</td>
                                <td>{txn.value}</td>
                                <td>
                                    <span className="badge badge-soft-warning py-1">Pending</span>
                                </td>
                                <td>
                                    <span className="badge badge-soft-danger py-1">Complete Transaction</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default Orders;
