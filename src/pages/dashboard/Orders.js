import React from 'react';
import { Card, CardBody, Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const Orders = ({ transactions }) => {
    const renderStatus = (status, reference) => {
        console.log(status)
        if (status === 'PENDING') {
            return (
                <React.Fragment>
                    <span className="badge badge-soft-warning py-1">PENDING</span>
                </React.Fragment>
            );
        }
        if (status === 'DECLINED') {
            return (
                <React.Fragment>
                    <span className="badge badge-soft-danger py-1">DECLINED</span>
                </React.Fragment>
            );
        }
        if (status === 'APPROVED') {
            return (
                <React.Fragment>
                    <span className="badge badge-soft-success py-1">COMPLETED</span>
                </React.Fragment>
            );
        }
    };

    const renderButton = (status, reference) => {
        if (status === 'PENDING') {
            return (
                <Link to={`./complete-transaction?reference=${reference}`}>
                    <React.Fragment>
                        <Button color="danger" size="xs">
                            Complete Transaction
                        </Button>
                    </React.Fragment>
                </Link>
            );
        }
    };

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
                                <td>
                                    {txn.txnForm === 'GIFT_CARD'
                                        ? 'Gift Card'
                                        : 'Cryptocurrency'}
                                </td>
                                <td>{txn.txnType}</td>
                                <td>{txn.units}</td>
                                <td>{txn.value}</td>
                                <td>{renderStatus(txn.status, txn.reference)}</td>
                                <td>{renderButton(txn.status, txn.reference)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default Orders;
