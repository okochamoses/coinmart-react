import React from 'react';
import { Button, Media } from 'reactstrap';
import {} from 'react-feather';
import { Link } from 'react-router-dom';

const Member = ({ image, name, description, className }) => {
    return (
        <Media className="mt-1 pt-3 m-2 p-3" style={{ backgroundColor: '#f6f6f7', borderRadius: '10px' }}>
            <img
                src={image}
                className={`avatar-lg avatar-ignore-height rounded mr-3 ${className}`}
                alt={name}
                style={{ maxHeight: 43, width: '' }}
                height={43}
            />
            <Media body>
                <h6 className="mt-1 mb-0 font-size-15">{name}</h6>
                <p className="card-text font-size-10">
                    <small className="text-muted">{description}</small>
                </p>

                {/* <Button className="float-right mt-2" size={'sm'} color="primary">
                    Trade Now
                </Button> */}
            </Media>
            <Media body>
                <Link to={`./transfer?name=${name}`}>
                    <Button className="float-right mt-2" size={'sm'} color="primary">
                        Trade
                    </Button>
                </Link>
            </Media>
        </Media>
    );
};

export default Member;
