import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

const AssetInfo = ({ rate, giftCard }) => {
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
                    <CardBody>
                        <h5 className="card-title font-size-16">{giftCard.name}</h5>

                        <p className="card-text">
                            <small className="text-muted">
                                Selling Rate: {rate} {giftCard.currency}
                            </small>
                            <br></br>
                            <small className="text-muted">
                                Buying Rate: {rate} {giftCard.currency}
                            </small>
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
