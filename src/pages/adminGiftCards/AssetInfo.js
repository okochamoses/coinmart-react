import React from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';

const AssetInfo = ({ buying, selling, giftCard, toggle, updateSelected, toggleRates, getRates, toggleStatus }) => {
    // console.log(giftCard);
    const toggleModal = () => {
        updateSelected(giftCard.name, giftCard.id);
        toggle();
    };

    const toggleRatesModal = async () => {
        await updateSelected(giftCard.name, giftCard.id);
        toggleRates();
        await getRates();
    };

    return (
        <Card className="border border-bottom-4">
            <Row
                className="no-gutters justify-content-center align-items-center pl-3"
                // add hover to change background color and add small shadow
                style={{
                    backgroundColor: 'rgb(253, 253, 253)',
                    // borderRadius: '10px',
                    borderBottom: `3px solid ${giftCard.active ? 'green' : 'red'}`,
                }}>
                <Col md={4} xs={4} className=" justify-content-center align-items-center">
                    <img
                        className="card-img justify-content-center align-self-center"
                        src={giftCard.image}
                        alt=""
                        style={{ height: 'inherit', width: 'inherit' }}
                    />
                </Col>
                <Col md={8} xs={8}>
                    <CardBody>
                        <h5 className="card-title font-size-16">{giftCard.name}</h5>

                        <p className="card-text">
                            {selling !== undefined || selling === '' ? (
                                <small className="text-muted">
                                    Selling Rate: {selling} {giftCard.currency}
                                </small>
                            ) : null}
                            <br></br>
                            {buying !== undefined && buying !== '' && buying !== null ? (
                                <small className="text-muted">
                                    Buying Rate: {buying} {giftCard.currency}
                                </small>
                            ) : null}
                        </p>
                    </CardBody>
                </Col>
                <Col md={12}>
                    <Button className="m-2" color="primary" size="xs" onClick={toggleRatesModal}>
                        View Rates
                    </Button>
                    <Button className="m-2" color="warning" size="xs" onClick={toggleModal}>
                        Change Rates
                    </Button>
                    <Button
                        className="m-2"
                        color={giftCard.active ? 'danger' : 'success'}
                        size="xs"
                        onClick={() => toggleStatus(giftCard.id, !giftCard.active)}>
                        {giftCard.active ? 'Disable' : 'Enable'} Crypto
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

export default AssetInfo;
