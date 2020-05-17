import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Chat from '@material-ui/icons/Chat';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Fingerprint from '@material-ui/icons/Fingerprint';
// core components
import GridContainer from '../components/Grid/GridContainer.js';
import GridItem from '../components/Grid/GridItem.js';
import InfoArea from '../components/InfoArea/InfoArea.js';

import styles from '../../../assets/jss/material-kit-react/views/landingPageSections/productStyle.js';

import { cardTitle } from '../../../assets/jss/material-kit-react.js';
import { Col, Row } from 'reactstrap';
import AssetInfo from '../../giftCards/AssetInfo';
import { fetchJSON } from '../../../helpers/api.js';

const useStyles = makeStyles(styles);

export default function AssetSection() {
    const [giftCards, setGiftCards] = useState([]);
    const [userId, setUserId] = useState(0);

    const getGiftCards = async () => {
        try {
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            const response = await fetchJSON('/gift-cards/rates/all', options);
            if (response.code === 0) {
                // console.log(response.data);
                const rates = response.data;
                // rates.sort((a, b) => (a.giftCard.name > b.giftCard.name ? 1 : -1));
                setGiftCards(rates.slice(0, 8));
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getGiftCards();
    }, [userId]);

    const classes = useStyles();
    return (
        <div className={classes.section}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8}>
                    <h2 className={classes.title}>Current Giftcard Rates</h2>
                    {giftCards.length > 0 ? console.log(giftCards) : console.log(123)}
                </GridItem>
            </GridContainer>
            <Row>
                {giftCards.map((asset) => {
                    return (
                        <Col md="3">
                            <AssetInfo buying={asset.buying} selling={`${asset.currencyTo}${asset.selling}`} giftCard={asset.giftCard} />
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}
