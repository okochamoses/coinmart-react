import React from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import Member from './MenuItem';

import avatarImg1 from '../../assets/images/users/avatar-1.jpg';

const ProjectStats = props => {
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <CardBody className="p-0">
                            {/* <h6 className="card-title border-bottom p-3 mb-0 header-title">Trade Gift Cards</h6>

                            <Button className="card-title float-right mt-2" size={'sm'} color="primary">
                                View All
                            </Button> */}
                            <Button className="float-right mt-2 m-3" size={'sm'} color="primary">
                                View All
                            </Button>
                            <h5 className="mb-4 m-3">Hi Moses</h5>
                            <hr></hr>
                            <Row className="py-1" style={{ borderBottom: '10px' }}>
                                {props.giftCards.map(giftCard => {
                                    return (
                                        <Col xl={3} sm={6}>
                                            <Member
                                                image={avatarImg1}
                                                name={giftCard.name}
                                                description={giftCard.currency + ' ' + giftCard.rate}
                                            />
                                        </Col>
                                    );
                                })}
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ProjectStats;
