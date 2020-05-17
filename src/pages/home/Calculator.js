import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

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

    async loadScripts() {
        // var Tawk_API = Tawk_API || {};

        // var Tawk_LoadStart = new Date();

        await (function () {
            var s1 = document.createElement('script'),
                s0 = document.getElementsByTagName('script')[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/5e9a2f8569e9320caac4d6dc/1e654lr8v';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        })();
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
        this.loadScripts();
        let cryptocurrencyRates = await this.getCryptoRates();
        let giftCardRates = await this.getGiftCardRates();
        cryptocurrencyRates = cryptocurrencyRates.map((c) => {
            return { ...c, ...{ asset: c.cryptocurrency } };
        });
        giftCardRates = giftCardRates.map((c) => {
            return { ...c, ...{ asset: c.giftCard } };
        });
        this.setState({ cryptocurrencyRates, giftCardRates });
    }
    async getCryptoRates() {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
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
            headers: { 'Content-Type': 'application/json' },
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
            if (`${r.giftCard.name} [${r.cardType}]` === e.label) {
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
                <Card>
                    <CardBody>
                        <h2 style={{textAlign: "center"}}>Rates Calculator</h2>
                        <p style={{textAlign: "center", color: "#000"}}>Calculate Rates for your next trade</p>
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
            </React.Fragment>
        );
    }
}

export default Cryptocurrencies;
