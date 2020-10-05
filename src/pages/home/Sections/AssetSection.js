import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridContainer from '../components/Grid/GridContainer.js';
import GridItem from '../components/Grid/GridItem.js';

import styles from '../../../assets/jss/material-kit-react/views/landingPageSections/productStyle.js';

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
                </GridItem>
            </GridContainer>
            <Row>
                {giftCards.map((asset, idx) => {
                    return (
                        <Col md="3">
                            <AssetInfo key={idx} buying={asset.buying} selling={`${asset.currencyTo}${asset.selling}`} giftCard={asset.giftCard} {...asset} />
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}
