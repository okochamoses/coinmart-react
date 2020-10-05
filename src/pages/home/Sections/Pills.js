import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Schedule from '@material-ui/icons/Schedule';
import List from '@material-ui/icons/List';

// core components
import GridContainer from '../components/Grid/GridContainer.js';
import GridItem from '../components/Grid/GridItem.js';
import NavPills from '../components/NavPills/NavPills.js';
import Button from '../components/CustomButtons/Button.js';

import styles from '../../../assets/jss/material-kit-react/views/landingPageSections/workStyle.js';

const useStyles = makeStyles(styles);

export default function Pills() {
    const classes = useStyles();
    return (
        <div className={classes.section}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={8} lg={6}>
                    <h2 style={{ textAlign: 'center', fontFamily:"Montserrat", fontWeight: 400 }}>
                        The Easiest and Most Secure way to Trade Cryptocurrencies and Giftcards
                    </h2>
                    <p style={{ textAlign: 'center', color: 'orange', fontFamily:"Montserrat" }}>Buy & Sell from anywhere!</p>
                    <NavPills
                        color="danger"
                        tabs={[
                            {
                                tabButton: 'Charges',
                                tabIcon: Dashboard,
                                tabContent: (
                                    <span>
                                        <p style={{ color: '#000', fontFamily:"Montserrat" }}>Worried about charges?</p>
                                        <p style={{ color: '#000', fontFamily:"Montserrat" }}>
                                            We aim to deliver our services with the least stress to our customers, be it
                                            financially or physically. That being said, there are no hidden charges for
                                            any transactions carried out on our platform.
                                        </p>
                                        <p style={{ color: '#000', fontFamily:"Montserrat" }}>
                                            Every transaction that occurs on this platform makes sure you are aware of
                                            payments being made, and these payments are only for the assets you wish to
                                            purchase
                                        </p>
                                    </span>
                                ),
                            },
                            {
                                tabButton: 'Payouts',
                                tabIcon: Schedule,
                                tabContent: (
                                    <span>
                                        <p style={{ color: '#000', fontFamily:"Montserrat" }}>
                                            We are online 24/7 to do business and help you make money round-the-clock.
                                        </p>
                                        <p style={{ color: '#000', fontFamily:"Montserrat" }}>
                                            Whether it's to get an urgent transaction done or your daily routine
                                            transactions, you can count on us to give you complete on the platform.
                                        </p>
                                        <p style={{ color: '#000', fontFamily:"Montserrat" }}>
                                            Our agents are always on hand to make sure you get paid immediately your
                                            transaction is completed. Directly to your bank account
                                        </p>
                                    </span>
                                ),
                            },
                            {
                                tabButton: 'Tasks',
                                tabIcon: List,
                                tabContent: (
                                    <span>
                                        <p style={{ color: '#000', fontFamily:"Montserrat" }}>
                                            Collaboratively administrate empowered markets via plug-and-play networks.
                                            Dynamically procrastinate B2C users after installed base benefits.
                                        </p>
                                        <br />
                                        <p style={{ color: '#000', fontFamily:"Montserrat" }}>
                                            Dramatically visualize customer directed convergence without revolutionary
                                            ROI. Collaboratively administrate empowered markets via plug-and-play
                                            networks. Dynamically procrastinate B2C users after installed base benefits.
                                        </p>
                                        <br />
                                        <p style={{ color: '#000', fontFamily:"Montserrat" }}>
                                            Dramatically visualize customer directed convergence without revolutionary
                                            ROI. Collaboratively administrate empowered markets via plug-and-play
                                            networks. Dynamically procrastinate B2C users after installed base benefits.
                                        </p>
                                    </span>
                                ),
                            },
                        ]}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={8} lg={6}>
                    <img src={require('../../../assets/images/mac.png')} width="100%" alt="Gift Cards and Crypto" />
                </GridItem>
            </GridContainer>
        </div>
    );
}
