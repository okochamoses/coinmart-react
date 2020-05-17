import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import AssetInfo from './AssetInfo';
import { fetchJSON } from '../../helpers/api';
import { getLoggedInUser } from '../../helpers/authUtils';

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
        try {
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + getLoggedInUser().token },
            };
            const response = await fetchJSON('/gift-cards/rates/all', options);
            if (response.code === 0) {
                // console.log(response.data);
                const rates = response.data;
                rates.sort((a, b) => (a.giftCard.name > b.giftCard.name ? 1 : -1));
                return rates
            }
        } catch (e) {
            console.log(e);
        }
    }

    filterList = (e) => {
        const searchValue = e.target.value;
        const filtered = this.state.giftCardRates.filter((rates) =>
            rates.giftCard.name.toLowerCase().includes(searchValue.toLowerCase())
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
                                            <Col md={4} key={idx}>
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
