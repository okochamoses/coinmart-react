import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import AssetInfo from './AssetInfo';

class Cryptocurrencies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cryptocurrencyRates: [],
            filteredCryptocurrencyRates: [],
        };
    }

    async componentWillMount() {
        const cryptocurrencyRates = await this.getCrytoRates();

        this.setState({ cryptocurrencyRates, filteredCryptocurrencyRates: cryptocurrencyRates });
    }

    async getCrytoRates() {
        return [
            {
                rate: 7500.52,
                active: true,
                cryptocurrency: {
                    name: 'Bitcoin',
                    image: './images/cryptocurrencies/bitcoin.png',
                    currency: 'USD',
                },
            },
            {
                rate: 758.52,
                active: true,
                cryptocurrency: {
                    name: 'Bitcoin Cash',
                    image: './images/cryptocurrencies/bitcoin_cash.png',
                    currency: 'USD',
                },
            },
            {
                rate: 758.52,
                active: true,
                cryptocurrency: {
                    name: 'Ethereum',
                    image: './images/cryptocurrencies/ethereum.png',
                    currency: 'USD',
                },
            },
            {
                rate: 758.52,
                active: true,
                cryptocurrency: {
                    name: 'Ethereum classic',
                    image: './images/cryptocurrencies/ethereum_classic.png',
                    currency: 'USD',
                },
            },
            {
                rate: 758.52,
                active: true,
                cryptocurrency: {
                    name: 'Litecoin',
                    image: './images/cryptocurrencies/litecoin.png',
                    currency: 'USD',
                },
            },
            {
                rate: 758.52,
                active: true,
                cryptocurrency: {
                    name: 'Dashcoin',
                    image: './images/cryptocurrencies/dash.png',
                    currency: 'USD',
                },
            },
            {
                rate: 758.52,
                active: true,
                cryptocurrency: {
                    name: 'Dogecoin',
                    image: './images/cryptocurrencies/dogecoin.png',
                    currency: 'USD',
                },
            },
            {
                rate: 758.52,
                active: true,
                cryptocurrency: {
                    name: 'Monero',
                    image: './images/cryptocurrencies/monero.png',
                    currency: 'USD',
                },
            },
            {
                rate: 758.52,
                active: true,
                cryptocurrency: {
                    name: 'Ripple',
                    image: './images/cryptocurrencies/ripple.png',
                    currency: 'USD',
                },
            },
        ];
    }

    filterList = e => {
        const searchValue = e.target.value;
        const filtered = this.state.cryptocurrencyRates.filter(rates =>
            rates.cryptocurrency.name.toLowerCase().includes(searchValue)
        );
        this.setState({ filteredCryptocurrencyRates: filtered });
    };

    render() {
        const { filteredCryptocurrencyRates } = this.state;
        return (
            <React.Fragment>
                <Row className="page-title">
                    <Col md={12}>
                        <PageTitle
                            breadCrumbItems={
                                [
                                    // { label: 'Pages', path: '/pages/starter' },
                                    // { label: 'Starter', path: '/pages/starter', active: true },
                                ]
                            }
                            title={'Cryptocurrencies'}
                        />
                    </Col>

                    <Col md={12}>
                        <Card>
                            <CardBody>
                                <div className="mt-2 mb-3 row justify-content-between">
                                    <div className="app-search">
                                        <form>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search..."
                                                    onChange={this.filterList}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="mt-1 pt-2 border-top text-left">
                                    <p className="text-muted mb-2">View all cryptocurrency rates</p>
                                </div>

                                <div className="row mt-4 mb-3">
                                    {filteredCryptocurrencyRates.map((cryptocurrencyRate, idx) => {
                                        return (
                                            <Col md={3}>
                                                <AssetInfo key={idx} {...cryptocurrencyRate} />
                                            </Col>
                                        );
                                    })}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Cryptocurrencies;
