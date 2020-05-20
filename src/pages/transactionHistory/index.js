import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Table, Button } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import { getLoggedInUser } from '../../helpers/authUtils';
import { fetchJSON } from '../../helpers/api';
import noTransaction from '../../assets/images/projects/no_transactions.jpg';
import { Link } from 'react-router-dom';

class TransactionHistory extends Component {
    constructor(props) {
        super(props);
        this.state = { transactions: [] };
    }

    async componentDidMount() {
        await this.getTransactions();
    }

    async getTransactions() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + getLoggedInUser().token,
            },
        };
        const response = await fetchJSON('/transactions/find-all', options);
        if (response.code === 0) {
            this.setState({ transactions: response.data });
        }
    }

    renderStatus = (status, reference) => {
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

    renderButton = (status, reference) => {
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

    render() {
        const { transactions } = this.state;
        return (
            <React.Fragment>
                <Row className="page-title justify-content-md-center">
                    <Col md={12}>
                        <PageTitle
                            breadCrumbItems={
                                [
                                    // { label: 'Pages', path: '/pages/starter' },
                                    // { label: 'Starter', path: '/pages/starter', active: true },
                                ]
                            }
                            title={'Complete Transaction'}
                        />
                    </Col>
                    <Col md={10}>
                        <br></br>
                        <Card className="justify-content-md-center">
                            <CardBody className="p-4">
                                {transactions.length === 0 ? (
                                    <React.Fragment>
                                        <img src={noTransaction} style={{ width: '100%' }} alt="No Transactions" />
                                        <h4>You currently have no transactions</h4>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <h4>Transaction Details</h4>
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
                                                        <td>{this.renderStatus(txn.status, txn.reference)}</td>
                                                        <td>{this.renderButton(txn.status, txn.reference)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </React.Fragment>
                                )}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default TransactionHistory;
