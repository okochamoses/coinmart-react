import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import cryptoImage from '../../assets/images/util/cryptocurrencies.png';
import giftCardsImage from '../../assets/images/util/itunes-card.png';

import MainItem from './MainItemWidget';
import Orders from './Orders';
import ProjectStats from './ProjectStats';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

        this.state = {
            user: getLoggedInUser(),
            filterDate: [oneWeekAgo, new Date()],
            mostUsedGiftCards: [],
            assets: [],
        };
    }

    async componentWillMount() {
        const giftCards = [
            {
                name: 'Apple Gift Card',
                rate: '200',
                currency: 'NGN',
            },
            {
                name: 'Amazon Gift Card',
                rate: '300',
                currency: 'NGN',
            },
            {
                name: 'Google Gift Card',
                rate: '7500',
                currency: 'NGN',
            },
            {
                name: 'Vanilla  Gift Card',
                rate: '7500',
                currency: 'NGN',
            },
        ];
        const assetData = await this.getAssetData();
        this.setState({ mostUsedGiftCards: giftCards, assets: assetData });
    }

    async getAssetData() {
        return [
            {
                name: 'Cryptocurrencies',
                description: 'Exchange your cryptocurrencies at excellent prices',
                image: cryptoImage,
                url: './cryptocurrencies',
            },
            {
                name: 'Gift Cards',
                description: 'Exchange your gift cards at excellent prices',
                image: giftCardsImage,
                url: './gift-cards',
            },
        ];
    }

    render() {
        return (
            <React.Fragment>
                <div className="">
                    {/* preloader */}
                    {this.props.loading && <Loader />}

                    <Row className="page-title align-items-center">
                        <Col sm={4} xl={6}>
                            <h4 className="mb-1 mt-0">Dashboard</h4>
                        </Col>
                        {/* <Col sm={8} xl={6}>
                            <form className="form-inline float-sm-right mt-3 mt-sm-0">
                                <div className="form-group mb-sm-0 mr-2">
                                    <Flatpickr
                                        value={this.state.filterDate}
                                        onChange={date => {
                                            this.setState({ filterDate: date });
                                        }}
                                        options={{ mode: 'range' }}
                                        className="form-control"
                                    />
                                </div>
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="primary" className="dropdown-toggle">
                                        <i className="uil uil-file-alt mr-1"></i>Download
                                        <i className="icon ml-1">
                                            <ChevronDown />
                                        </i>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <Mail className="icon-dual icon-xs mr-2"></Mail>
                                            <span>Email</span>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Printer className="icon-dual icon-xs mr-2"></Printer>
                                            <span>Print</span>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            <File className="icon-dual icon-xs mr-2"></File>
                                            <span>Re-Generate</span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </form>
                        </Col> */}
                    </Row>

                    {/* stats */}
                    <ProjectStats giftCards={this.state.mostUsedGiftCards}></ProjectStats>
                    {/* <Statistics></Statistics> */}

                    {/* charts */}
                    <Row>
                        <Col xl={3}>
                            <MainItem {...this.state.assets[0]} />
                        </Col>

                        <Col xl={3}>
                            <MainItem {...this.state.assets[1]} />
                        </Col>
                        <Col xl={6}>
                            <Orders />
                        </Col>
                    </Row>

                    {/* charts */}
                    {/* <Row>
                        <Col xl={5}>
                            <SalesChart />
                        </Col>
                        <Col xl={7}>
                            <Orders />
                        </Col>
                    </Row> */}

                    {/* <Row>
                        <Col xl={4}>
                            <Performers />
                        </Col>
                        <Col xl={4}>
                            <Tasks />
                        </Col>
                        <Col xl={4}>
                            <Chat />
                        </Col>
                    </Row> */}
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
