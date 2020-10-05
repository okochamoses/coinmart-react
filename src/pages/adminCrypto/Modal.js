import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, InputGroup } from 'reactstrap';
import { fetchJSON } from '../../helpers/api';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';
import AvFeedback from 'availity-reactstrap-validation/lib/AvFeedback';
import Loader from '../../components/Loader';
import { getLoggedInUser } from '../../helpers/authUtils';

const ChangeRateModal = ({ id, asset, modal, toggle, loader, toggleLoader, refresh }) => {
    const handleValidSubmit = (event, values) => {
        changeRates(asset, values);
    };

    const changeRates = async (asset, values) => {
        console.log(toggleLoader);
        const buying = [
            {
                "amount": values.buying50,
                "amountRange": "R50_300",
            },
            {
                "amount": values.buying300,
                "amountRange": "R300_1000",
            },
            {
                "amount": values.buying1000,
                "amountRange": "R1000_5000",
            },
            {
                "amount": values.buying5000,
                "amountRange": "R5000_1000000",
            },
        ];


        const selling = [
            {
                "amount": values.selling50,
                "amountRange": "R50_300",
            },
            {
                "amount": values.selling300,
                "amountRange": "R300_1000",
            },
            {
                "amount": values.selling1000,
                "amountRange": "R1000_5000",
            },
            {
                "amount": values.selling5000,
                "amountRange": "R5000_1000000",
            },
        ];

        toggleLoader();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getLoggedInUser().token,
            },
            body: JSON.stringify({ buying, selling, cryptocurrency: { id } }),
        };
        const response = await fetchJSON(`/cryptocurrencies/rates`, options);
        refresh();
        toggleLoader();
        if (response.code === 0) {
            // show an approval message
        }
    };

    return (
        <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered" size="md">
            {loader && <Loader />}
            <AvForm onValidSubmit={handleValidSubmit} className="authentication-form">
                <ModalHeader toggle={toggle}>Set Rates for {asset}</ModalHeader>
                <ModalBody>
                    <AvGroup className="mb-3">
                        <Label for="asset">Asset</Label>
                        <InputGroup>
                            <AvInput type="text" name="asset" id="asset" disabled value={asset} required />
                        </InputGroup>
                        <AvFeedback>Please enter a valid amount</AvFeedback>
                    </AvGroup>

                    <AvGroup className="mb-3">
                        <Label for="buying50">Buying | 50 - 299.99</Label>
                        <InputGroup>
                            <AvInput type="number" name="buying50" id="buying50" required />
                        </InputGroup>
                        <AvFeedback>Please enter a valid amount</AvFeedback>
                    </AvGroup>

                    <AvGroup className="mb-3">
                        <Label for="buying300">Buying | 300 - 999.99</Label>
                        <InputGroup>
                            <AvInput type="number" name="buying300" id="buying300" required />
                        </InputGroup>
                        <AvFeedback>Please enter a valid amount</AvFeedback>
                    </AvGroup>

                    <AvGroup className="mb-3">
                        <Label for="buying1000">Buying | 1000 - 4999.99</Label>
                        <InputGroup>
                            <AvInput type="number" name="buying1000" id="buying1000" required />
                        </InputGroup>
                        <AvFeedback>Please enter a valid amount</AvFeedback>
                    </AvGroup>

                    <AvGroup className="mb-3">
                        <Label for="buying5000">Buying | 5000 - 1000000</Label>
                        <InputGroup>
                            <AvInput type="number" name="buying5000" id="buying5000" required />
                        </InputGroup>
                        <AvFeedback>Please enter a valid amount</AvFeedback>
                    </AvGroup>

                    <AvGroup className="mb-3">
                        <Label for="selling50">Selling | 50 - 299.99</Label>
                        <InputGroup>
                            <AvInput type="number" name="selling50" id="selling50" required />
                        </InputGroup>
                        <AvFeedback>Please enter a valid amount</AvFeedback>
                    </AvGroup>

                    <AvGroup className="mb-3">
                        <Label for="selling300">Selling | 300 - 999.99</Label>
                        <InputGroup>
                            <AvInput type="number" name="selling300" id="selling300" required />
                        </InputGroup>
                        <AvFeedback>Please enter a valid amount</AvFeedback>
                    </AvGroup>

                    <AvGroup className="mb-3">
                        <Label for="selling1000">Selling | 1000 - 4999.99</Label>
                        <InputGroup>
                            <AvInput type="number" name="selling1000" id="selling1000" required />
                        </InputGroup>
                        <AvFeedback>Please enter a valid amount</AvFeedback>
                    </AvGroup>

                    <AvGroup className="mb-3">
                        <Label for="selling5000">Selling | 5000 - 1000000</Label>
                        <InputGroup>
                            <AvInput type="number" name="selling5000" id="selling5000" required />
                        </InputGroup>
                        <AvFeedback>Please enter a valid amount</AvFeedback>
                    </AvGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="primary">
                        Submit
                    </Button>
                    <Button color="secondary" className="ml-1" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </AvForm>
        </Modal>
    );
};

export default ChangeRateModal;
