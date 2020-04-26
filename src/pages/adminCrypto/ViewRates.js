import React, { Component } from 'react';
import Loader from '../../components/Loader';
import { Button, ModalFooter, Modal, ModalHeader, ModalBody } from 'reactstrap';
import ToolkitProvider, { CSVExport, Search } from 'react-bootstrap-table2-toolkit';
import { Row, Col } from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class ViewRates extends Component {
    // Set colums for table
    columns = [
        {
            dataField: 'buying',
            text: 'Buying',
            sort: true,
        },
        {
            dataField: 'selling',
            text: 'Selling',
            sort: true,
        },
        {
            dataField: 'createdAt',
            text: 'Create Time',
            sort: true,
        },
        {
            dataField: 'updatedAt',
            text: 'Disabled Time',
            sort: true,
        },
        {
            dataField: 'active',
            text: 'Active',
            sort: true,
        },
    ];

    // display on a table with paginationrender
    render() {
        const records = this.props.rates;
        const { SearchBar } = Search;
        const { ExportCSVButton } = CSVExport;
        const columns = this.columns;
        return (
            <Modal
                isOpen={this.props.modal}
                toggle={this.props.toggle}
                scrollable
                className="modal-dialog-centered"
                size="lg">
                {this.props.loader && <Loader />}
                <ModalHeader toggle={this.props.toggle}>View {this.props.name} rates</ModalHeader>
                <ModalBody>
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
                                        <ExportCSVButton {...props.csvProps} className="btn btn-primary">
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
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" className="ml-1" onClick={this.props.toggleRates}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ViewRates;
