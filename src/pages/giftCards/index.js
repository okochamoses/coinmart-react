import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import AssetInfo from './AssetInfo';

class GiftCards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            giftCardRates: [],
            filteredGiftCardRates: [],
        };
    }

    async componentWillMount() {
        const giftCardRates = await this.getCrytoRates();

        this.setState({ giftCardRates, filteredGiftCardRates: giftCardRates });
    }

    async getCrytoRates() {
        return [
            {
                selling: 7500.52,
                active: true,
                giftCard: {
                    name: 'iTunes',
                    image: './images/giftcards/itunes.png',
                    currency: 'USD',
                },
            },
            {
                selling: 758.52,
                active: true,
                giftCard: {
                    name: 'Google',
                    image: './images/giftcards/google.png',
                    currency: 'USD',
                },
            },
            {
                selling: 758.52,
                active: true,
                giftCard: {
                    name: 'Sephora',
                    image: './images/giftcards/sephora.png',
                    currency: 'USD',
                },
            },
            {
                selling: 758.52,
                active: true,
                giftCard: {
                    name: 'Nike',
                    image: './images/giftcards/nike.png',
                    currency: 'USD',
                },
            },
            {
                selling: 758.52,
                active: true,
                giftCard: {
                    name: 'Steam',
                    image: './images/giftcards/steam.png',
                    currency: 'USD',
                },
            },
            {
                selling: 758.52,
                active: true,
                giftCard: {
                    name: 'Vanilla',
                    image: './images/giftcards/vanilla.png',
                    currency: 'USD',
                },
            },
            {
                selling: 758.52,
                active: true,
                giftCard: {
                    name: 'Netflix',
                    image: './images/giftcards/netflix.png',
                    currency: 'USD',
                },
            },
            {
                selling: 758.52,
                active: true,
                giftCard: {
                    name: 'Amazon',
                    image: './images/giftcards/amazon.png',
                    currency: 'USD',
                },
            },
            {
                selling: 758.52,
                active: true,
                giftCard: {
                    name: 'Walmart',
                    image: './images/giftcards/walmart.png',
                    currency: 'USD',
                },
            },
            {
                selling: 758.52,
                active: true,
                giftCard: {
                    name: 'Walmart Visa',
                    image: './images/giftcards/walmart_visa.png',
                    currency: 'USD',
                },
            },
        ];
    }

    filterList = (e) => {
        const searchValue = e.target.value;
        const filtered = this.state.giftCardRates.filter((rates) =>
            rates.giftCard.name.toLowerCase().includes(searchValue)
        );
        this.setState({ filteredGiftCardRates: filtered });
    };

    render() {
        const { filteredGiftCardRates } = this.state;
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
                            title={'GiftCards'}
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
                                    <p className="text-muted mb-2">Gift card rates</p>
                                </div>

                                <div className="row mt-4 mb-3">
                                    {filteredGiftCardRates.map((giftCardRate, idx) => {
                                        return (
                                            <Col md={4}>
                                                <AssetInfo key={idx} {...giftCardRate} />
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

export default GiftCards;
