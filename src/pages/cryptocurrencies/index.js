import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import AssetInfo from './AssetInfo';
import { getLoggedInUser } from '../../helpers/authUtils';
import { fetchJSON } from '../../helpers/api';

class Cryptocurrencies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cryptocurrencyRates: [],
            filteredCryptocurrencyRates: [],
        };
    }

    async componentDidMount() {
        const cryptocurrencyRates = await this.getCrytoRates();
        console.log(cryptocurrencyRates);

        this.setState({ cryptocurrencyRates, filteredCryptocurrencyRates: cryptocurrencyRates });
    }

    async getCrytoRates() {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + getLoggedInUser().token },
        };
        const response = await fetchJSON('/cryptocurrencies/rates', options);
        if (response.code === 0) {
            // console.log(response.data);
            return response.data;
        }
    }

    filterList = (e) => {
        const searchValue = e.target.value;
        const filtered = this.state.cryptocurrencyRates.filter((rates) =>
            rates.cryptocurrency.name.toLowerCase().includes(searchValue)
        );
        this.setState({ filteredCryptocurrencyRates: filtered });
    };

    render() {
        let { filteredCryptocurrencyRates } = this.state;
        // filteredCryptocurrencyRates = [];
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
