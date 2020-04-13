import React from 'react';
import { Row, Col, Card, CardBody, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const MainItemWidget = ({ image, name, description, url }) => {
    console.log(image, name, description, url);
    return (
        <Row>
            <Col>
                <Card className={classNames('card-pricing')}>
                    <CardBody className="p-4">
                        <Media>
                            <Media body>
                                <h5 className="mt-0 mb-2 font-size-16">{name}</h5>
                                <p>{description}</p>
                                <img className="pt-5" src={image} alt="" width="100%" />
                            </Media>
                        </Media>
                        <div className="mt-5 text-center">
                            <Link to={url}>
                                <button className={classNames('btn', 'btn-primary', 'form-control', 'px-sm-4')}>
                                    <i className="uil uil-arrow-right mr-1"></i>Trade Now
                                </button>
                            </Link>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default MainItemWidget;
