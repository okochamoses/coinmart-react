import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Member from './MenuItem';

import { getLoggedInUser } from '../../helpers/authUtils';

const ProjectStats = (props) => {
    const user = getLoggedInUser();
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <CardBody className="p-0">
                            <h5 className="mb-4 m-3">Hi {user.firstName}</h5>
                            <hr></hr>
                            <Row className="py-1" style={{ borderBottom: '10px' }}>
                                {props.giftCards.map((giftCard, idx) => {
                                    return (
                                        <Col key={idx} xl={3} sm={6}>
                                            <Member
                                                image={`./${giftCard.image}`}
                                                name={giftCard.name}
                                                description={giftCard.currency + ' ' + giftCard.selling}
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
