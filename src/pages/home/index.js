import React, { useState } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons

// core components
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import GridContainer from './components/Grid/GridContainer.js';
import GridItem from './components/Grid/GridItem.js';
import Button from './components/CustomButtons/Button.js';
import HeaderLinks from './components/Header/HeaderLinks.js';
import Parallax from './components/Parallax/Parallax.js';

import styles from '../../assets/jss/material-kit-react/views/landingPage.js';

// Sections for this page
import ProductSection from './Sections/ProductSection.js';
import WorkSection from './Sections/WorkSection.js';
import AssetSection from './Sections/AssetSection.js';
import Calculator from './Calculator.js';
import { Link, Redirect } from 'react-router-dom';
import { getLoggedInUser } from '../../helpers/authUtils.js';
import Pills from './Sections/Pills.js';
import { Row, Col, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { fetchJSON } from '../../helpers/api.js';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
    const classes = useStyles();
    const { ...rest } = props;
    const [email, setEmail] = useState('');
    const [btnLoad, setBtnLoad] = useState(false);
    const [modal, setModal] = useState(false);
    const subscribe = async () => {
        setBtnLoad(true);
        // api call to subscribe

        try {
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            const response = await fetchJSON('/authenticate/app/subscribe?email=' + email, options);

            // Modal popup sent
            setModal(true);
        } catch (e) {
            console.log(e);
        }

        setBtnLoad(false);
    };
    return (
        <div>
            {getLoggedInUser() !== null ? <Redirect to="/dashboard" /> : null}
            <Header
                color="white"
                routes={dashboardRoutes}
                brand={<img src={require('../../assets/images/logo.png')} height="50px" />}
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 400,
                    color: 'white',
                }}
                {...rest}
            />
            <Parallax image={require('../../assets/images/white-bg.jpg')}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6} style={{ marginTop: '60px' }}>
                            <h1 className="h-title" style={{ color: 'black' }}>
                                Trade cryptocurrencies and giftcards
                            </h1>
                            <h4 className="h-subtitle">
                                Trade cryptocurrencies and giftcards almost realtime as our agents are always available
                                to help you through any trade at cheap and affordable rates
                                {/* Every landing page needs a small description after the big bold title, that{"'"}s why we
                                added this text here. Add here all the information that can make you or your product
                                create the first impression. */}
                            </h4>
                            <br />
                            <Link to="/account/login">
                                <Button color="danger" size="lg">
                                    <i className="fa fa-play pr-2" />
                                    Start Trading
                                </Button>
                            </Link>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6} className="d-none d-sm-block">
                            <img src={(Math.random() * 10) < 5 ? "./images/cards.png" : "./images/crypto.png"} width="100%" alt="Gift Cards and Crypto" />
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>

            <div className={classNames(classes.main)}>
                <div className={classes.container}>
                    <Row className="h-intro">
                        <Col md={12}>
                            <p className="h-title pb-4" style={{ color: '#fff', textAlign: 'center' }}>
                                How to start a Trade
                            </p>
                        </Col>
                        {/* <Col md={12} className=""> */}
                        <Col md={2} className="large-icon">
                            <i class="material-icons h-icon">account_circle</i>
                            <p className="h-subtitle" style={{ color: '#fff', fontSize: '24px' }}>
                                Step 1
                            </p>
                            <p className="h-subtitle" style={{ color: '#fff', fontSize: '14px' }}>
                                Sign up for an account and login
                            </p>
                        </Col>
                        <Col>
                            <hr className="h-dotted" />{' '}
                        </Col>
                        <Col md={2} className="large-icon">
                            <i class="material-icons h-icon">credit_card</i>
                            <p className="h-subtitle" style={{ color: '#fff', fontSize: '24px' }}>
                                Step 2
                            </p>
                            <p className="h-subtitle" style={{ color: '#fff', fontSize: '14px' }}>
                                Select card info or enter bitcoin amount to trade
                            </p>
                        </Col>

                        <Col>
                            <hr className="h-dotted" />{' '}
                        </Col>
                        <Col md={2} className="large-icon">
                            <i class="material-icons h-icon">question_answer</i>
                            <p className="h-subtitle" style={{ color: '#fff', fontSize: '24px' }}>
                                Step 3
                            </p>
                            <p className="h-subtitle" style={{ color: '#fff', fontSize: '14px' }}>
                                Chat with an agent on the next screen to upload/confirm transaction details
                            </p>
                        </Col>
                        <Col>
                            <hr className="h-dotted" />{' '}
                        </Col>
                        <Col md={2} className="large-icon">
                            <i class="material-icons h-icon">check</i>
                            <p className="h-subtitle" style={{ color: '#fff', fontSize: '24px' }}>
                                Step 4
                            </p>
                            <p className="h-subtitle" style={{ color: '#fff', fontSize: '14px' }}>
                                You get credit to your bank as soon as system prcessing is done and funds will be
                                available to you.
                            </p>
                        </Col>
                        {/* </Col> */}
                    </Row>
                    {/* <ProductSection /> */}
                    <Pills />
                    {/* <hr /> */}
                    <Calculator />
                    <Row className="h-intro" style={{ padding: '0px !important', margin: 0 }}>
                        <Col md={12} className="pt-5" style={{ textAlign: 'center' }}>
                            <h1 className="h-title" style={{ color: '#fff' }}>
                                Be the first to hear
                            </h1>
                            <h4 className="h-subtitle pt-3 pb-4" style={{ color: '#fff' }}>
                                When we launch our mobile apps
                            </h4>
                            <Col>
                                <img src="./images/playstore.png" />
                                {/* </Col>
                            <Col> */}
                                <img src="./images/app-store.png" />
                            </Col>
                            <Row className="pb-5 justify-content-md-center " style={{ textAlign: 'center' }}>
                                <Col md={4} className="pt-3">
                                    {/* <FormGroup> */}
                                    <Input
                                        style={{ height: '50px' }}
                                        className="input-lg"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Col>
                                <Col md={2} className="pt-3">
                                    <button
                                        onClick={subscribe}
                                        type="button"
                                        style={{ height: '50px' }}
                                        className="btn btn-light btn-lg form-control">
                                        {btnLoad ? <i class="fa fa-circle-o-notch fa-spin fa-fw"></i> : 'Subscribe'}
                                    </button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {/* <Row className="h-intro" style={{padding: "0px !important", margin: 0}}>
                        <Col md={6}  style={{backgroundColor: "#fff"}}>
                                Moses
                        </Col>
                    </Row> */}
                    <AssetSection />
                    {/* <WorkSection /> */}

                    <Modal
                        isOpen={modal}
                        // toggle={this.toggle}
                        className="modal-dialog-centered"
                        // size={this.state.size}
                    >
                    <ModalHeader toggle={() => setModal(false)}></ModalHeader>
                        <ModalBody style={{textAlign: "center"}}>
                        <i class="material-icons" style={{color:"green", fontSize: "72px"}}>check_circle</i>
                        <p className="h-subtitle">
                            Thanks for subscribing. We'll notify you as soon as we launch
                        </p>
                        </ModalBody>
                        
                    </Modal>
                </div>
            </div>
            <Footer />
        </div>
    );
}
