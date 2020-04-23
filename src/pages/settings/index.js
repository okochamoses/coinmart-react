import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
    Input,
    Form,
    FormGroup,
    Label,
    Button,
    FormText,
    UncontrolledAlert,
} from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import { getLoggedInUser } from '../../helpers/authUtils';
import { fetchJSON } from '../../helpers/api';

class TransactionHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            oldPasswordError: ' ',
            newPasswordError: ' ',
            confirmPasswordError: ' ',
            response: null,
        };
    }

    async componentDidMount() {}

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.validation(e.target.name, e.target.value);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ response: null });
        this.changePassword();
    };

    renderDisabledClassname = () => {
        if (
            this.state.oldPasswordError === '' &&
            this.state.newPasswordError === '' &&
            this.state.confirmPasswordError === ''
        ) {
            return true;
        }
        return false;
    };

    validation = (name, value) => {
        const regex = new RegExp(
            '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
        );
        const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
        const mediumRegex = new RegExp(
            '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
        );
        switch (name) {
            case 'oldPassword':
                if (value === '') {
                    this.setState({ oldPasswordError: 'Password field cannot be empty' });
                } else {
                    this.setState({ oldPasswordError: '' });
                }
                break;
            case 'newPassword':
                if (value === '') {
                    this.setState({ newPasswordError: 'Password field cannot be empty' });
                } else if (!mediumRegex.test(value)) {
                    this.setState({
                        newPasswordError:
                            'Passsword must have at keast six characters or more and has at least one lowercase and one uppercase alphabetical character or has at least one lowercase and one numeric character',
                    });
                } else {
                    this.setState({ newPasswordError: '' });
                }
                break;
            case 'confirmPassword':
                if (value === '') {
                    this.setState({ confirmPasswordError: 'Field cannot be empty' });
                } else if (value !== this.state.newPassword) {
                    this.setState({
                        confirmPasswordError: 'Passwords do not match',
                    });
                } else {
                    this.setState({ confirmPasswordError: '' });
                }
                break;

            default:
                break;
        }
    };

    renderNotification = () => {
        if (this.state.response == null) {
            return <hr />;
        }
        if (this.state.response.code === 10) {
            return <UncontrolledAlert color="danger">{this.state.response.description}</UncontrolledAlert>;
        }
        if (this.state.response.code === 0) {
            return <UncontrolledAlert color="success">You have successfully changed our password</UncontrolledAlert>;
        }
    };

    async changePassword() {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + getLoggedInUser().token,
            },
            body: `oldPassword=${this.state.oldPassword}&newPassword=${this.state.newPassword}`,
        };
        const response = await fetchJSON('/users/change-password', options);
        this.setState({ response: response });
    }

    render() {
        return (
            <React.Fragment>
                <Row className="page-title justify-content-md-center">
                    <Col md={12}>
                        <PageTitle
                            breadCrumbItems={
                                [
                                    // { label: 'Pages', path: '/pages/starter' },
                                    // { label: 'Starter', path: '/pages/starter', active: true },
                                ]
                            }
                            title={'Complete Transaction'}
                        />
                    </Col>
                    <Col md={6}>
                        <br></br>
                        <Card className="justify-content-md-center">
                            <CardBody className="p-4">
                                <h4>Change Password</h4>
                                <React.Fragment>
                                    {this.state.response !== null ? this.renderNotification() : <hr />}
                                </React.Fragment>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Label for="text">Old Password</Label>
                                        <Input
                                            type="password"
                                            name="oldPassword"
                                            id="text"
                                            onChange={this.handleChange}
                                        />
                                        <FormText className="text-danger">{this.state.oldPasswordError}</FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="text">New Password</Label>
                                        <Input
                                            type="password"
                                            name="newPassword"
                                            id="text"
                                            onChange={this.handleChange}
                                        />
                                        <FormText className="text-danger">{this.state.newPasswordError}</FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="text">Confirm Password</Label>
                                        <Input
                                            type="password"
                                            name="confirmPassword"
                                            id="text"
                                            onChange={this.handleChange}
                                        />
                                        <FormText className="text-danger">{this.state.confirmPasswordError}</FormText>
                                    </FormGroup>
                                    <Button
                                        className="form-control"
                                        disabled={
                                            !(
                                                this.state.oldPasswordError === '' &&
                                                this.state.newPasswordError === '' &&
                                                this.state.confirmPasswordError === ''
                                            )
                                        }
                                        color="primary"
                                        type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default TransactionHistory;
