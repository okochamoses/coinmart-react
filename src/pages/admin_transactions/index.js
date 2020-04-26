import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Input, Button, UncontrolledAlert } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import { getLoggedInUser } from '../../helpers/authUtils';
import { fetchJSON } from '../../helpers/api';
import Loader from '../../components/Loader';
import ToolkitProvider, { CSVExport, Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = { transactions: [], modal: false, loader: false, notification: false };
    }

    columns = [
        {
            dataField: 'id',
            text: 'ID',
            sort: true,
        },
        {
            dataField: 'asset',
            text: 'Asset',
            sort: true,
        },
        {
            dataField: 'initDate',
            text: 'Start Date',
            sort: true,
        },
        {
            dataField: 'confirmDate',
            text: 'Completed Date',
            sort: true,
        },
        {
            dataField: 'units',
            text: 'Units',
            sort: false,
        },
        {
            dataField: 'value',
            text: 'Amount',
            sort: true,
        },
        {
            dataField: 'txnForm',
            text: 'Type',
            sort: false,
        },
        {
            dataField: 'rate',
            text: 'Rate',
            sort: false,
        },
        {
            dataField: 'reference',
            text: 'Reference',
            sort: false,
        },
        {
            dataField: 'status',
            text: 'Status',
            sort: false,
        },
        {
            dataField: 'button',
            text: 'Actions',
            sort: false,
        },
    ];

    renderButton = (status, reference) => {
        if (status === 'PENDING') {
            return (
                <React.Fragment>
                    <Button
                        color="danger"
                        size="xs"
                        onClick={() => this.toggleTransactionStatus('DECLINED', reference)}>
                        Decline
                    </Button>
                    <Button
                        color="success"
                        size="xs"
                        onClick={() => this.toggleTransactionStatus('APPROVED', reference)}>
                        Approve
                    </Button>
                </React.Fragment>
            );
        }
    };

    renderNotification = (success) => {
        const color = success ? 'primary' : 'danger';
        const message = success ? 'Operation Successful' : 'Operation Failed!';
        this.setState({
            notification: (
                <React.Fragment>
                    <UncontrolledAlert key={Math.random(1000)} color={color}>
                        {message}
                    </UncontrolledAlert>
                </React.Fragment>
            ),
        });
    };

    toggleTransactionStatus = async (status, reference) => {
        this.toggleLoader();
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + getLoggedInUser().token,
            },
        };
        const response = await fetchJSON(`/transactions/admin/${reference}/update-status/${status}`, options);
        if (response.code === 0) {
            await this.getTransactions();
            this.renderNotification(true);
        } else {
            this.renderNotification(false);
        }
        this.toggleLoader();
    };

    defaultSorted = [
        {
            dataField: 'id',
            order: 'asc',
        },
    ];

    openModal = () => {
        this.toggle();
    };

    async componentDidMount() {
        await this.getTransactions();
    }

    toggleLoader() {
        this.setState((prevState) => ({
            loader: !prevState.loader,
        }));
    }

    async getTransactions() {
        this.toggleLoader();
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + getLoggedInUser().token,
            },
        };
        const response = await fetchJSON('/transactions/admin/find-all', options);
        if (response.code === 0) {
            const transactions = response.data.map((t) => {
                const form = t.txnType === 'BUY' ? 'buying' : 'selling';
                const rate = t.txnForm === 'CRYPTOCURRENCY' ? t.cryptoRate[form] : t.giftCardRate[form];
                return {
                    id: t.id,
                    asset: t.asset,
                    initDate: t.initDate,
                    confirmDate: t.confirmDate,
                    units: t.units,
                    value: t.value,
                    txnForm: t.txnForm,
                    reference: t.reference,
                    status: t.status,
                    rate: rate,
                    button: this.renderButton(t.status, t.reference),
                };
            });
            this.setState({ transactions });
        }
        this.toggleLoader();
    }

    defaultSorted = [
        {
            dataField: 'id',
            order: 'asc',
        },
    ];

    sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
        <React.Fragment>
            <label className="d-inline mr-1">Show</label>
            <Input
                type="select"
                name="select"
                id="no-entries"
                className="custom-select custom-select-sm d-inline col-1"
                defaultValue={currSizePerPage}
                onChange={(e) => onSizePerPageChange(e.target.value)}>
                {options.map((option, idx) => {
                    return <option key={idx}>{option.text}</option>;
                })}
            </Input>
            <label className="d-inline ml-1">entries</label>
        </React.Fragment>
    );
    render() {
        const { transactions: records, loader } = this.state;
        const { SearchBar } = Search;
        const { ExportCSVButton } = CSVExport;
        const columns = this.columns;
        return (
            <React.Fragment>
                <Row className="page-title justify-content-md-center">
                    {loader && <Loader />}
                    <Col md={12}>
                        <PageTitle
                            breadCrumbItems={[{ label: 'Transactions', path: '/pages/transactions', active: true }]}
                            title={'Transactions'}
                        />
                    </Col>
                    <Col md={12}>
                        <Card>
                            <CardBody className="p-4">
                                <Col md={12}>
                                    {this.state.notification}

                                    <ToolkitProvider
                                        bootstrap4
                                        keyField="id"
                                        data={records}
                                        columns={columns}
                                        search
                                        exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                                        {(props) => (
                                            <React.Fragment>
                                                <Row>
                                                    <Col>
                                                        <SearchBar {...props.searchProps} />
                                                    </Col>
                                                    <Col className="text-right">
                                                        <ExportCSVButton
                                                            {...props.csvProps}
                                                            className="btn btn-primary">
                                                            Export CSV
                                                        </ExportCSVButton>
                                                    </Col>
                                                </Row>

                                                <BootstrapTable
                                                    {...props.baseProps}
                                                    bordered={false}
                                                    defaultSorted={this.defaultSorted}
                                                    pagination={paginationFactory({
                                                        sizePerPage: 5,
                                                        sizePerPageRenderer: this.sizePerPageRenderer,
                                                        sizePerPageList: [
                                                            { text: '5', value: 5 },
                                                            { text: '10', value: 10 },
                                                            { text: '25', value: 25 },
                                                            { text: 'All', value: records.length },
                                                        ],
                                                    })}
                                                    wrapperClasses="table-responsive"
                                                />
                                            </React.Fragment>
                                        )}
                                    </ToolkitProvider>
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Admin;
