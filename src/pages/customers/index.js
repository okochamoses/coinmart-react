import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
    Button,
    Badge,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label,
    InputGroup,
    InputGroupAddon,
    Table,
} from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import { getLoggedInUser } from '../../helpers/authUtils';
import { fetchJSON } from '../../helpers/api';
import { User, Mail, Shield, Lock } from 'react-feather';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';
import AvFeedback from 'availity-reactstrap-validation/lib/AvFeedback';
import Loader from '../../components/Loader';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = { customers: [], modal: false, loader: false };

        this.toggle = this.toggle.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    toggle = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
    };

    openModal = () => {
        this.toggle();
    };

    async componentDidMount() {
        await this.getAdmins();
    }

    toggleLoader() {
        this.setState((prevState) => ({
            loader: !prevState.loader,
        }));
    }

    async getAdmins() {
        this.toggleLoader();
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getLoggedInUser().token,
            },
        };
        const response = await fetchJSON('/users/admin', options);
        if (response.code === 0) {
            this.setState({ customers: response.data });
        }
        this.toggleLoader();
    }

    handleValidSubmit = async (event, values) => {
        this.toggleLoader();
        await this.registerAdmin(values.firstName, values.lastName, values.email, values.username, values.password);
        this.toggleLoader();
    };

    registerAdmin = async (firstName, lastName, email, username, password) => {
        this.toggleLoader();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getLoggedInUser().token,
            },
            body: JSON.stringify({ firstName, lastName, email, username, password }),
        };
        const response = await fetchJSON(`/admin/register`, options);
        this.toggleLoader();
        if (response.code === 0) {
            this.getAdmins();
        }
    };

    async toggleAdminStatus(username, status) {
        this.toggleLoader();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + getLoggedInUser().token,
            },
            body: `username=${username}`,
        };
        await fetchJSON(`/users/admin/${status ? 'disable' : 'enable'}`, options);
        this.toggleLoader();
        this.getAdmins();
    }
    render() {
        const { customers, loader } = this.state;
        return (
            <React.Fragment>
                <Row className="page-title justify-content-md-center">
                    {loader && <Loader />}
                    <Col md={12}>
                        <PageTitle
                            breadCrumbItems={[{ label: 'Administrators', path: '/pages/admin', active: true }]}
                            title={'Customers'}
                        />
                    </Col>
                    <Col md={12}>
                        <Card>
                            <CardBody className="p-4">
                                <Col md={12}>
                                    <Button
                                        color={`outline-primary`}
                                        size="sm"
                                        className="float-right m-1 font-size-14"
                                        onClick={this.openModal}>
                                        Add +
                                    </Button>
                                </Col>
                                <Table className="table table-striped" responsive>
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Username</th>
                                            <th>Phone</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.map((admin, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td>{idx + 1}</td>
                                                    <td>{admin.firstName}</td>
                                                    <td>{admin.lastName}</td>
                                                    <td>{admin.username}</td>
                                                    <td>{admin.phone}</td>
                                                    <td>
                                                        <Badge color={admin.active ? 'success' : 'danger'}>
                                                            {admin.active ? 'Active' : 'Inactive'}
                                                        </Badge>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            size="sm"
                                                            color={admin.active ? 'danger' : 'success'}
                                                            onClick={() =>
                                                                this.toggleAdminStatus(admin.username, admin.active)
                                                            }>
                                                            {admin.active ? 'Disable' : 'Enable'}
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>

                                <Modal
                                    isOpen={this.state.modal}
                                    toggle={this.toggle}
                                    className="modal-dialog-centered"
                                    size="md">
                                    {loader && <Loader />}
                                    <AvForm onValidSubmit={this.handleValidSubmit} className="authentication-form">
                                        <ModalHeader toggle={this.toggle}>Create Admin</ModalHeader>
                                        <ModalBody>
                                            <AvGroup className="mb-3">
                                                <Label for="firstName">First Name</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                        <span className="input-group-text">
                                                            <User className="icon-dual" />
                                                        </span>
                                                    </InputGroupAddon>
                                                    <AvInput type="text" name="firstName" id="firstName" required />
                                                </InputGroup>
                                                <AvFeedback>This field is invalid</AvFeedback>
                                            </AvGroup>

                                            <AvGroup className="mb-3">
                                                <Label for="lastName">Last Name</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                        <span className="input-group-text">
                                                            <User className="icon-dual" />
                                                        </span>
                                                    </InputGroupAddon>
                                                    <AvInput type="text" name="lastName" id="lastName" required />
                                                </InputGroup>
                                                <AvFeedback>This field is invalid</AvFeedback>
                                            </AvGroup>

                                            <AvGroup className="mb-3">
                                                <Label for="email">Email</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                        <span className="input-group-text">
                                                            <Mail className="icon-dual" />
                                                        </span>
                                                    </InputGroupAddon>
                                                    <AvInput type="email" name="email" id="email" required />
                                                </InputGroup>
                                                <AvFeedback>This field is invalid</AvFeedback>
                                            </AvGroup>

                                            <AvGroup className="mb-3">
                                                <Label for="username">Username</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                        <span className="input-group-text">
                                                            <Shield className="icon-dual" />
                                                        </span>
                                                    </InputGroupAddon>
                                                    <AvInput type="text" name="username" id="username" required />
                                                </InputGroup>
                                                <AvFeedback>This field is invalid</AvFeedback>
                                            </AvGroup>

                                            <AvGroup className="mb-3">
                                                <Label for="password">Password</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                        <span className="input-group-text">
                                                            <Lock className="icon-dual" />
                                                        </span>
                                                    </InputGroupAddon>
                                                    <AvInput type="text" name="password" id="password" required />
                                                </InputGroup>
                                                <AvFeedback>This field is invalid</AvFeedback>
                                            </AvGroup>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button type="submit" color="primary">
                                                Do Something
                                            </Button>
                                            <Button color="secondary" className="ml-1" onClick={this.toggle}>
                                                Cancel
                                            </Button>
                                        </ModalFooter>
                                    </AvForm>
                                </Modal>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Admin;
