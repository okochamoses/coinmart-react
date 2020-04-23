import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import CryptoJS from 'crypto-js';

import PageTitle from '../../components/PageTitle';
import InfoBar from './InfoBar';
import FormBar from './FormBar';
import { getLoggedInUser } from '../../helpers/authUtils';
import { fetchJSON } from '../../helpers/api';

class Cryptocurrencies extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            activeTab: '1',
            cryptocurrencyRates: [],
            giftCardRates: [],
            selectedCrypto: {},
            selectedGiftCard: {},
            txnType: '',
            amount: '0.00',
            defaultSelect: {},
        };
        this.toggle = this.toggle.bind(this);
    }

    /**
     * Toggle the tab
     */
    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
                selectedCrypto: {},
                selectedGiftCard: {},
                txnType: '',
                amount: 0.0,
            });
        }
    };

    async componentDidMount() {
        let cryptocurrencyRates = await this.getCryptoRates();
        let giftCardRates = await this.getGiftCardRates();
        cryptocurrencyRates = cryptocurrencyRates.map((c) => {
            return { ...c, ...{ asset: c.cryptocurrency } };
        });
        giftCardRates = giftCardRates.map((c) => {
            return { ...c, ...{ asset: c.giftCard } };
        });
        this.setState({ cryptocurrencyRates, giftCardRates });
        let name = new URLSearchParams(this.props.location.search).get('name');
        if (name !== null) {
            giftCardRates.forEach((g) => {
                if (g.asset.name.toLocaleLowerCase() === name.toLocaleLowerCase()) {
                    this.setState({
                        activeTab: '1',
                        selectedCrypto: g,
                        defaultSelect: { label: name, value: name.toLocaleLowerCase() },
                    });
                }
            });
            cryptocurrencyRates.forEach((g) => {
                if (g.asset.name.toLocaleLowerCase() === name.toLocaleLowerCase()) {
                    this.setState({
                        activeTab: '2',
                        selectedCrypto: g,
                        defaultSelect: { label: name, value: name.toLocaleLowerCase() },
                    });
                }
            });
        }
    }
    async getCryptoRates() {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + getLoggedInUser().token },
        };
        const response = await fetchJSON('/cryptocurrencies/rates', options);
        if (response.code === 0) {
            console.log(response.data);
            return response.data;
        }
    }

    async getGiftCardRates() {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + getLoggedInUser().token },
        };
        const response = await fetchJSON('/gift-cards/rates', options);
        if (response.code === 0) {
            console.log(response.data);
            return response.data;
        }
    }

    updateCryptoImage = (e) => {
        let selected = {};
        this.state.cryptocurrencyRates.forEach((r) => {
            if (r.cryptocurrency.name === e.label) {
                selected = r;
            }
        });
        this.setState({ selectedCrypto: selected });
    };

    updateGiftCardImage = (e) => {
        let selected = {};
        this.state.giftCardRates.forEach((r) => {
            if (r.giftCard.name === e.label) {
                selected = r;
            }
        });
        this.setState({ selectedCrypto: selected });
    };

    updateTxnType = (e) => {
        this.setState({ txnType: e.value });
    };

    updateAmounr = (e) => {
        this.setState({ amount: e.target.value });
    };

    render() {
        const { giftCardRates, cryptocurrencyRates } = this.state;

        const tabContents = [
            {
                id: '1',
                title: 'Gift Cards',
                icon: 'uil-home-alt',
                rates: giftCardRates,
            },
            {
                id: '2',
                title: 'Cryptocurrencies',
                icon: 'uil-user',
                rates: cryptocurrencyRates,
            },
        ];

        return (
            <React.Fragment>
                <Row className="page-title justify-content-md-center">
                    <Col md={12}>
                        <PageTitle breadCrumbItems={[]} title={'Trade'} />
                    </Col>
                    <Col sm={12} md={12} lg={8}>
                        <Card>
                            <CardBody>
                                {/* tab pills */}
                                <Col lg={12}>
                                    <Card>
                                        <CardBody>
                                            <Nav className="nav nav-pills navtab-bg nav-justified">
                                                {tabContents.map((tab, index) => {
                                                    return (
                                                        <NavItem key={index}>
                                                            <NavLink
                                                                href="#"
                                                                className={classnames({
                                                                    active: this.state.activeTab === tab.id,
                                                                })}
                                                                onClick={() => {
                                                                    this.toggle(tab.id);
                                                                }}>
                                                                <i
                                                                    className={classnames(
                                                                        tab.icon,
                                                                        'd-sm-none',
                                                                        'd-block',
                                                                        'mr-1'
                                                                    )}></i>
                                                                <span className="d-none d-sm-block">{tab.title}</span>
                                                            </NavLink>
                                                        </NavItem>
                                                    );
                                                })}
                                            </Nav>

                                            <TabContent activeTab={this.state.activeTab}>
                                                {tabContents.map((tab, index) => {
                                                    return (
                                                        <TabPane tabId={tab.id} key={index}>
                                                            <Row>
                                                                <Col sm="7">
                                                                    <FormBar
                                                                        tab={tab}
                                                                        activeTab={this.state.activeTab}
                                                                        updateGiftCardImage={this.updateGiftCardImage}
                                                                        updateCryptoImage={this.updateCryptoImage}
                                                                        updateAmounr={this.updateAmounr}
                                                                        updateTxnType={this.updateTxnType}
                                                                        parentState={this.state}
                                                                    />
                                                                </Col>
                                                                <Col
                                                                    sm="5"
                                                                    className="p-4"
                                                                    style={{ backgroundColor: '#f8f9fa' }}>
                                                                    <InfoBar
                                                                        activeTab={this.state.activeTab}
                                                                        selectedCrypto={this.state.selectedCrypto}
                                                                        amount={this.state.amount}
                                                                        txnType={this.state.txnType}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </TabPane>
                                                    );
                                                })}
                                            </TabContent>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Cryptocurrencies;
