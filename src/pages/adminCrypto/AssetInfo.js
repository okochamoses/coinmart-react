import React from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';

const AssetInfo = ({
    buying,
    selling,
    cryptocurrency,
    toggle,
    updateSelected,
    toggleRates,
    getRates,
    toggleStatus,
}) => {
    // console.log(cryptocurrency);
    const toggleModal = () => {
        updateSelected(cryptocurrency.name, cryptocurrency.id);
        toggle();
    };

    const toggleRatesModal = async () => {
        await updateSelected(cryptocurrency.name, cryptocurrency.id);
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
                    borderBottom: `3px solid ${cryptocurrency.active ? 'green' : 'red'}`,
                }}>
                <Col md={2} xs={2} className=" justify-content-center align-items-center">
                    <img
                        className="card-img justify-content-center align-self-center"
                        src={cryptocurrency.image}
                        alt=""
                        style={{ height: 'inherit', width: 'inherit' }}
                    />
                </Col>
                <Col md={6} xs={6}>
                    <CardBody>
                        <h5 className="card-title font-size-16">{cryptocurrency.name}</h5>

                        <p className="card-text">
                            {selling !== undefined || selling === '' ? (
                                <small className="text-muted">
                                    Selling Rate: {selling[0].amount} {cryptocurrency.currency}
                                </small>
                            ) : null}
                            <br></br>
                            {buying !== undefined || buying === '' ? (
                                <small className="text-muted">
                                    Buying Rate: {buying[0].amount} {cryptocurrency.currency}
                                </small>
                            ) : null}
                        </p>
                    </CardBody>
                </Col>
                <Col md={3} style={{ height: '100%' }}></Col>
                <Col md={12}>
                    <Button className="m-2" color="primary" size="xs" onClick={toggleRatesModal}>
                        View Rates
                    </Button>
                    <Button className="m-2" color="warning" size="xs" onClick={toggleModal}>
                        Change Rates
                    </Button>
                    <Button
                        className="m-2"
                        color={cryptocurrency.active ? 'danger' : 'success'}
                        size="xs"
                        onClick={() => toggleStatus(cryptocurrency.id, !cryptocurrency.active)}>
                        {cryptocurrency.active ? 'Disable' : 'Enable'} Crypto
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

export default AssetInfo;
