import React from 'react';
import { Card, CardBody, Table, Button } from 'reactstrap';

const Orders = () => {
    return (
        <Card>
            <CardBody className="pb-0">
                <Button className="float-right" size={'sm'} color="primary">
                    <i className="uil uil-export ml-1"></i> Export
                </Button>

                <h5 className="card-title mt-0 mb-0 header-title">Recent Transactions</h5>

                <Table hover responsive className="mt-4">
                    <thead>
                        <tr>
                            <th scope="col">Transaction ID</th>
                            <th scope="col">Asset</th>
                            <th scope="col">Type</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#98754</td>
                            <td>Bitcoin</td>
                            <td>SELL</td>
                            <td>0.15 BTC</td>
                            <td>
                                <span className="badge badge-soft-warning py-1">Pending</span>
                            </td>
                        </tr>
                        <tr>
                            <td>#98753</td>
                            <td>iTunes Gift Card</td>
                            <td>BUY</td>
                            <td>$450.00</td>
                            <td>
                                <span className="badge badge-soft-success py-1">Delivered</span>
                            </td>
                        </tr>
                        <tr>
                            <td>#98752</td>
                            <td>Amazon Gift Card</td>
                            <td>BUY</td>
                            <td>$450.00</td>
                            <td>
                                <span className="badge badge-soft-success py-1">Delivered</span>
                            </td>
                        </tr>
                        <tr>
                            <td>#98752</td>
                            <td>Amazon Gift Card</td>
                            <td>BUY</td>
                            <td>$450.00</td>
                            <td>
                                <span className="badge badge-soft-danger py-1">Declined</span>
                            </td>
                        </tr>
                        <tr>
                            <td>#98751</td>
                            <td>Vanilla Gift Card</td>
                            <td>BUY</td>
                            <td>$450.00</td>
                            <td>
                                <span className="badge badge-soft-success py-1">Delivered</span>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default Orders;
