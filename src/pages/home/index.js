import React from 'react';
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
import { Link, Redirect } from 'react-router-dom';
import { getLoggedInUser } from '../../helpers/authUtils.js';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
    const classes = useStyles();
    const { ...rest } = props;
    return (
        <div>
          {
            getLoggedInUser() !== null ? <Redirect to="/dashboard" /> : null
          }
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
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.title} style={{ color: 'black' }}>
                                Trade cryptocurrencies and giftcards
                            </h1>
                            <h4>
                              Trade cryptocurrencies and giftcards almost realtime as our agents are always available to help you through any trade
                              at cheap and affordable rates
                                {/* Every landing page needs a small description after the big bold title, that{"'"}s why we
                                added this text here. Add here all the information that can make you or your product
                                create the first impression. */}
                            </h4>
                            <br />
                            <Link to="/account/login">
                                <Button color="danger" size="lg">
                                    <i className="fas fa-play" />
                                    Start Trading
                                </Button>
                            </Link>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <img src={require('../../assets/images/giftcard2.png')} alt="Gift Cards and Crypto" />
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <ProductSection />
                    <AssetSection />
                    {/* <WorkSection /> */}
                </div>
            </div>
            <Footer />
        </div>
    );
}
