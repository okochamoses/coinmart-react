import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

const AssetInfo = ({ rate, cryptocurrency }) => {
    return (
        <Card>
            <Row
                className="no-gutters justify-content-center align-items-center pl-3"
                // add hover to change background color and add small shadow
                style={{ backgroundColor: 'rgb(253, 253, 253)', borderRadius: '10px' }}>
                <Col md={2} xs={2} className=" justify-content-center align-items-center">
                    <img
                        className="card-img justify-content-center align-self-center"
                        src={cryptocurrency.image}
                        alt=""
                        style={{ height: 'inherit', width: 'inherit' }}
                    />
                </Col>
                <Col md={8} xs={8}>
                    <CardBody>
                        <h5 className="card-title font-size-16">{cryptocurrency.name}</h5>

                        <p className="card-text">
                            <small className="text-muted">
                                Selling Rate: {rate} {cryptocurrency.currency}
                            </small>
                            <br></br>
                            <small className="text-muted">
                                Buying Rate: {rate} {cryptocurrency.currency}
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
