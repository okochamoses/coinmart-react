import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, InputGroup } from 'reactstrap';
import { fetchJSON } from '../../helpers/api';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';
import AvFeedback from 'availity-reactstrap-validation/lib/AvFeedback';
import Loader from '../../components/Loader';
import { getLoggedInUser } from '../../helpers/authUtils';

const ChangeRateModal = ({ id, asset, cardType, modal, toggle, loader, toggleLoader, refresh }) => {
    const handleValidSubmit = (event, values) => {
        changeRates(asset, values.buying, values.selling, cardType);
    };

    const changeRates = async (asset, buying, selling, cardType) => {
        toggleLoader();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getLoggedInUser().token,
            },
            body: JSON.stringify({ buying, selling, giftCard: { id }, cardType }),
        };
        const response = await fetchJSON(`/gift-cards/rates`, options);
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
                        <Label for="cardType">Card Type</Label>
                        <InputGroup>
                            <AvInput type="text" name="cardType" id="cardType" disabled value={cardType} />
                        </InputGroup>
                        <AvFeedback>Please enter a valid amount</AvFeedback>
                    </AvGroup>

                    <AvGroup className="mb-3">
                        <Label for="selling">Selling</Label>
                        <InputGroup>
                            <AvInput type="number" name="selling" id="selling" required />
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
