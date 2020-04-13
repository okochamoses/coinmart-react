import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Modals extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
        };

        this.toggle = this.toggle.bind(this);
        this.openModalWithSize = this.openModalWithSize.bind(this);
        this.openModalWithClass = this.openModalWithClass.bind(this);
    }

    /**
     * Show/hide the modal
     */
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
    };

    /**
     * Opens large modal
     */
    openModalWithSize = size => {
        this.setState({ size: size, className: null });
        this.toggle();
    };

    /**
     * Opens modal with custom class
     */
    openModalWithClass = className => {
        this.setState({ className: className, size: null });
        this.toggle();
    };

    renderName = () => {
        const selectedCrypto =
            this.props.parentState.selectedCrypto.asset === undefined
                ? ''
                : this.props.parentState.selectedCrypto.asset.name;
        return selectedCrypto;
    };

    render() {
        console.log(this.props.parentState);
        return (
            <React.Fragment>
                <button
                    type="button"
                    className="btn btn-primary btn-sm form-control"
                    onClick={() => this.openModalWithClass('modal-dialog-centered')}>
                    Trade Now
                </button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.state.className}
                    size={this.state.size}>
                    <ModalHeader toggle={this.toggle}>Initiate Trade</ModalHeader>
                    <ModalBody>
                        <p>
                            You are about to initiate a transaction with the datails below. You will be forwarded to an
                            administrator you can chat with to complete the transaction
                        </p>
                        <hr />
                        <h6>Transaction Details</h6>
                        <table className="table table-stripped">
                            <tr>
                                <th>Asset Name</th>
                                <td>{this.renderName()}</td>
                            </tr>
                            <tr>
                                <th>Transaction Type</th>
                                <td>{this.props.parentState.txnType}</td>
                            </tr>
                            <tr>
                                <th>Asset amount</th>
                                <td>
                                    {`$${this.props.parentState.amount.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}`}
                                </td>
                            </tr>
                            <tr>
                                <th>Amount to pay</th>
                                <td>
                                    {this.props.parentState.amount.toLocaleString('en-NG', {
                                        style: 'currency',
                                        currency: 'NGN',
                                    })}
                                </td>
                            </tr>
                        </table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>
                            Proceed
                        </Button>
                        <Button color="secondary" className="ml-1" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Modals;
