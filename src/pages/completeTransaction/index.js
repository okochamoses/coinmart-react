import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import { getLoggedInUser } from '../../helpers/authUtils';
import { fetchJSON } from '../../helpers/api';

class CompleteTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = { transaction: {} };
    }

    async componentDidMount() {
        await this.getTransactionByID();
        this.loadScripts();
        this.tawktoCredentials();
    }
    async loadScripts() {
        // var Tawk_API = Tawk_API || {};

        // var Tawk_LoadStart = new Date();

        await (function () {
            var s1 = document.createElement('script'),
                s0 = document.getElementsByTagName('script')[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/5e9a2f8569e9320caac4d6dc/1e656deut';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        })();
    }

    async getTransactionByID() {
        let reference = new URLSearchParams(this.props.location.search).get('reference');
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + getLoggedInUser().token,
            },
            body: `reference=${reference}`,
        };
        const response = await fetchJSON('/transactions/reference', options);
        if (response.code === 0) {
            this.setState({ transaction: response.data });
        }
    }

    tawktoCredentials() {
        setTimeout(function () {
            const user = getLoggedInUser();
            if (window.Tawk_API !== undefined) {
                window.Tawk_API.setAttributes(
                    {
                        name: `${user.firstName} ${user.lastName} 1`,
                        email: user.username,
                    },
                    function (error) {
                        // console.log(error);
                    }
                );

                window.Tawk_API.addEvent(
                    'Transaction',
                    {
                        type: 'Gift card',
                        name: 'Netflix',
                        transactionType: 'Sell',
                        price: '50 USD',
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            } else {
                console.log('Could not reach tawk.to api');
            }
        }, 7000);
    }

    render() {
        const { transaction } = this.state;
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
                    <Col md={6}>
                        <Card>
                            <CardBody className="p-4">
                                <h4>Transaction Details</h4>
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td>Transaction Reference</td>
                                            <td>{transaction.reference}</td>
                                        </tr>
                                        <tr>
                                            <td>Transaction Type</td>
                                            <td>{transaction.txnType}</td>
                                        </tr>
                                        <tr>
                                            <td>Asset Name</td>
                                            <td>{transaction.asset}</td>
                                        </tr>
                                        <tr>
                                            <td>Asset Type</td>
                                            <td>{transaction.txnForm}</td>
                                        </tr>
                                        <tr>
                                            <td>Amount</td>
                                            <td>{transaction.units} USD</td>
                                        </tr>
                                        <tr>
                                            <td>Amount to transfer</td>
                                            <td>{transaction.value} NGN</td>
                                        </tr>
                                        <tr>
                                            <td>Transacation Status</td>
                                            <td>PENDING</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default CompleteTransaction;
