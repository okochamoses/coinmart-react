import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import AssetInfo from './AssetInfo';
import { getLoggedInUser } from '../../helpers/authUtils';
import { fetchJSON } from '../../helpers/api';
import ChangeRateModal from './Modal';
import ViewRates from './ViewRates';
import Loader from '../../components/Loader';

class AdminCrypto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cryptocurrencyRates: [],
            filteredCryptocurrencyRates: [],
            modal: false,
            viewRatesModal: false,
            loader: false,
            selected: {},
            id: '',
            rates: [],
        };
        this.getCryptoRates = this.getCryptoRates.bind(this);
    }

    toggle = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
    };

    toggleRates = () => {
        this.setState((prevState) => ({
            viewRatesModal: !prevState.viewRatesModal,
        }));
    };

    openModal = () => {
        this.toggle();
    };

    toggleLoader = () => {
        this.setState((prevState) => ({
            loader: !prevState.loader,
        }));
    };

    updateSelected = async (name, id) => {
        console.log(id);
        await this.setState({ selected: name, id });
    };

    async componentDidMount() {
        await this.getCryptoRates();
    }


    rateCheck(rates, amount) {
        // Only one item should match in the rates object so pick that one
        const selectedRate = rates.filter(({startAmount, endAmount}) => startAmount <= amount && endAmount >= amount)[0];
        return selectedRate === undefined ? 0 : selectedRate.amount
    }

    async getCryptoRates() {
        this.toggleLoader();
        try {
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + getLoggedInUser().token },
            };
            const response = await fetchJSON('/cryptocurrencies/rates/all', options);
            if (response.code === 0) {
                // console.log(response.data);
                const rates = response.data;
                // const processedRates = []
                // rates.forEach(rate => {
                //     rate.buying = rate.buying[0];
                //     rate.selling = rate.selling[0];
                //     processedRates.push(rate)
                // })
                console.log(rates);
                // console.log(processedRates);
                rates.sort((a, b) => (a.cryptocurrency.name > b.cryptocurrency.name ? 1 : -1));
                this.setState({ cryptocurrencyRates: rates, filteredCryptocurrencyRates: rates });
            }
        } catch (e) {
            console.log(e);
        }
        this.toggleLoader();
    }

    getRatesById = async () => {
        this.setState({ rates: [] });
        this.toggleLoader();
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getLoggedInUser().token,
            },
        };
        try {
            const response = await fetchJSON(`/cryptocurrencies/${this.state.id}/rates`, options);
            if (response.code === 0) {
                const rates = response.data;
                await this.setState({ rates });
            } else {
                // display error
            }
        } catch (e) {
            // display error
        }
        this.toggleLoader();
    };

    toggleStatus = async (id, status) => {
        this.setState({ rates: [] });
        this.toggleLoader();
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getLoggedInUser().token,
            },
        };
        try {
            const response = await fetchJSON(`/cryptocurrencies/${id}/${status ? 'enable' : 'disable'}`, options);
            if (response.code === 0) {
                await this.setState({ rates: response.data });
                this.getCryptoRates();
            } else {
                // display error
            }
        } catch (e) {
            // display error
        }
        this.toggleLoader();
    };

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
                    {this.state.loader && <Loader />}
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
                                                <AssetInfo
                                                    modal={this.state.modal}
                                                    toggleRates={this.toggleRates}
                                                    toggleStatus={this.toggleStatus}
                                                    toggle={this.toggle}
                                                    loader={this.state.loader}
                                                    toggleLoader={this.toggleLoader}
                                                    updateSelected={this.updateSelected}
                                                    getRates={this.getRatesById}
                                                    key={idx}
                                                    {...cryptocurrencyRate}
                                                />
                                            </Col>
                                        );
                                    })}

                                    <ChangeRateModal
                                        asset={this.state.selected}
                                        id={this.state.id}
                                        loader={this.state.loader}
                                        modal={this.state.modal}
                                        toggle={this.toggle}
                                        toggleLoader={this.toggleLoader}
                                        refresh={this.getCryptoRates}
                                    />
                                    <ViewRates
                                        loader={this.state.loader}
                                        modal={this.state.viewRatesModal}
                                        toggleRates={this.toggleRates}
                                        toggleLoader={this.toggleLoader}
                                        rates={this.state.rates}
                                        name={this.state.selected}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default AdminCrypto;
