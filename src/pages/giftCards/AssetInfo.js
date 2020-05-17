import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

const AssetInfo = ({ selling, buying, giftCard, cardType }) => {
    return (
        <Card>
            <Row className="no-gutters justify-content-center align-items-center">
                <Col md={3} xs={2} className=" justify-content-center align-items-center">
                    <img
                        className="card-img justify-content-center align-self-center"
                        src={giftCard.image}
                        alt=""
                        style={{ width: 'inherit', height: 'auto' }}
                    />
                </Col>
                <Col md={7} xs={8}>
                    <CardBody style={{ textAlign: 'left' }}>
                        <h5 className="">{giftCard.name}</h5>

                        <p className="">
                            {selling !== undefined || selling === '' ? (
                                <small className="text-muted">
                                    Selling Rate: {selling} {giftCard.currency}
                                </small>
                            ) : null}
                            <br></br>
                            {buying === undefined || buying === null ? null : (
                                <small className="text-muted">
                                    Buying Rate: {buying} {giftCard.currency}
                                </small>
                            )}
                            <small className="text-muted">Card Type: {cardType}</small>
                        </p>
                    </CardBody>
                </Col>
                <Col md={2} style={{ height: '100%' }}>
                    {/* <button type="button" className="btn btn-primary btn-sm form-control">
                        Trade
                    </button> */}
                </Col>
            </Row>
        </Card>
    );
};

export default AssetInfo;
