import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import cryptoImage from '../../assets/images/util/cryptocurrencies.png';
import giftCardsImage from '../../assets/images/util/itunes-card.png';

import MainItem from './MainItemWidget';
import Orders from './Orders';
import ProjectStats from './ProjectStats';
import { fetchJSON } from '../../helpers/api';

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

    async componentDidMount() {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + getLoggedInUser().token },
        };
        const response = await fetchJSON('/assets/top-assets', options);
        const giftCards = response.data;
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
