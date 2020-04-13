import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

import PageTitle from '../../components/PageTitle';
import InfoBar from './InfoBar';
import FormBar from './FormBar';

class Cryptocurrencies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            cryptocurrencyRates: [],
            giftCardRates: [],
            selectedCrypto: {},
            selectedGiftCard: {},
            txnType: '',
            amount: '0.00',
        };
        this.toggle = this.toggle.bind(this);
    }

    /**
     * Toggle the tab
     */
    toggle = tab => {
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
        cryptocurrencyRates = cryptocurrencyRates.map(c => {
            return { ...c, ...{ asset: c.cryptocurrency } };
        });
        giftCardRates = giftCardRates.map(c => {
            return { ...c, ...{ asset: c.giftCard } };
        });
        this.setState({ cryptocurrencyRates, giftCardRates });
    }
    async getCryptoRates() {
        return [
            {
                sell: 7500.52,
                buy: 7500.52,
                active: true,
                cryptocurrency: {
                    name: 'Bitcoin',
                    image: './images/cryptocurrencies/bitcoin.png',
                    currency: 'USD',
                },
            },
            {
                sell: 758.52,
                buy: 758.52,
                active: true,
                cryptocurrency: {
                    name: 'Bitcoin Cash',
                    image: './images/cryptocurrencies/bitcoin_cash.png',
                    currency: 'USD',
                },
            },
            {
                sell: 758.52,
                buy: 758.52,
                active: true,
                cryptocurrency: {
                    name: 'Ethereum',
                    image: './images/cryptocurrencies/ethereum.png',
                    currency: 'USD',
                },
            },
            {
                sell: 758.52,
                buy: 758.52,
                active: true,
                cryptocurrency: {
                    name: 'Ethereum classic',
                    image: './images/cryptocurrencies/ethereum_classic.png',
                    currency: 'USD',
                },
            },
            {
                sell: 758.52,
                buy: 758.52,
                active: true,
                cryptocurrency: {
                    name: 'Litecoin',
                    image: './images/cryptocurrencies/litecoin.png',
                    currency: 'USD',
                },
            },
            {
                sell: 758.52,
                buy: 758.52,
                active: true,
                cryptocurrency: {
                    name: 'Dashcoin',
                    image: './images/cryptocurrencies/dash.png',
                    currency: 'USD',
                },
            },
            {
                sell: 758.52,
                buy: 758.52,
                active: true,
                cryptocurrency: {
                    name: 'Dogecoin',
                    image: './images/cryptocurrencies/dogecoin.png',
                    currency: 'USD',
                },
            },
            {
                sell: 758.52,
                buy: 758.52,
                active: true,
                cryptocurrency: {
                    name: 'Monero',
                    image: './images/cryptocurrencies/monero.png',
                    currency: 'USD',
                },
            },
            {
                sell: 758.52,
                buy: 758.52,
                active: true,
                cryptocurrency: {
                    name: 'Ripple',
                    image: './images/cryptocurrencies/ripple.png',
                    currency: 'USD',
                },
            },
        ];
    }

    async getGiftCardRates() {
        return [
            {
                buy: 7500.52,
                sell: 2000,
                active: true,
                giftCard: {
                    name: 'iTunes',
                    image: './images/giftcards/itunes.png',
                    currency: 'USD',
                },
            },
            {
                buy: 758.52,
                sell: 200,
                active: true,
                giftCard: {
                    name: 'Google',
                    image: './images/giftcards/google.png',
                    currency: 'USD',
                },
            },
            {
                buy: 758.52,
                sell: 200,
                active: true,
                giftCard: {
                    name: 'Sephora',
                    image: './images/giftcards/sephora.png',
                    currency: 'USD',
                },
            },
            {
                buy: 758.52,
                sell: 200,
                active: true,
                giftCard: {
                    name: 'Nike',
                    image: './images/giftcards/nike.png',
                    currency: 'USD',
                },
            },
            {
                buy: 758.52,
                sell: 200,
                active: true,
                giftCard: {
                    name: 'Steam',
                    image: './images/giftcards/steam.png',
                    currency: 'USD',
                },
            },
            {
                buy: 758.52,
                sell: 200,
                active: true,
                giftCard: {
                    name: 'Vanilla',
                    image: './images/giftcards/vanilla.png',
                    currency: 'USD',
                },
            },
            {
                buy: 758.52,
                sell: 200,
                active: true,
                giftCard: {
                    name: 'Netflix',
                    image: './images/giftcards/netflix.png',
                    currency: 'USD',
                },
            },
            {
                buy: 758.52,
                sell: 200,
                active: true,
                giftCard: {
                    name: 'Amazon',
                    image: './images/giftcards/amazon.png',
                    currency: 'USD',
                },
            },
            {
                buy: 758.52,
                sell: 200,
                active: true,
                giftCard: {
                    name: 'Walmart',
                    image: './images/giftcards/walmart.png',
                    currency: 'USD',
                },
            },
            {
                buy: 758.52,
                sell: 200,
                active: true,
                giftCard: {
                    name: 'Walmart Visa',
                    image: './images/giftcards/walmart_visa.png',
                    currency: 'USD',
                },
            },
        ];
    }

    updateCryptoImage = e => {
        let selected = {};
        this.state.cryptocurrencyRates.forEach(r => {
            if (r.cryptocurrency.name === e.label) {
                selected = r;
            }
        });
        this.setState({ selectedCrypto: selected });
    };

    updateGiftCardImage = e => {
        let selected = {};
        this.state.giftCardRates.forEach(r => {
            if (r.giftCard.name === e.label) {
                selected = r;
            }
        });
        this.setState({ selectedCrypto: selected });
    };

    updateTxnType = e => {
        this.setState({ txnType: e.value });
    };

    updateAmounr = e => {
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
