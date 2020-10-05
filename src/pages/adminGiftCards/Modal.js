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
        
        let range = assetList[asset];
        range = range === undefined ? ['R25_1000000'] : range;

        const selling = range.map(r => {
            return {
                "amount": values[r]/1,
                "amountRange": r
            }
        });
        changeRates(asset, values.buying, selling, cardType);
    };

    const assetList = {
        iTunes: ['R25_50', 'R50_100'],
        Steam: ['R20_50', 'R50_100', 'R100_500'],
        Google: ['R25_50', 'R50_500'],
        Vanilla: ['R100_300', 'R300_500'],
        Sephora: ['R50_100', 'R100_500'],
        Nike: ['R100_200', 'R200_500'],
        'American Express': ['R100_300', 'R300_500'],
        'Walmart Visa': ['R100_300', 'R300_500'],
        Walmart: ['R100_300', 'R300_500'],
        Ebay: ['R50_100', 'R100_500'],
        Visa: ['R100_200', 'R200_500'],
        'Amazon Debit Receipt': ['R25_50', 'R50_100', 'R100_500'],
        Nordstrom: ['R100_500'],
        'Razer Gold': ['R25_100', 'R100_500'],
    };

    const changeRates = async (asset, buying, selling, cardType) => {
        toggleLoader();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getLoggedInUser().token,
            },
            body: JSON.stringify({ buying:[], selling, giftCard: { id }, cardType }),
        };
        const response = await fetchJSON(`/gift-cards/rates`, options);
        refresh();
        toggleLoader();
        if (response.code === 0) {
            // show an approval message
        }
    };

    const rangeToText = (range) => {
        const splitVals =  range.slice(1).split('_'); // e.g ([50, 200])
        return "$" + splitVals[0] +  ' - $' + (splitVals[1]/1);
    };

    const renderInputs = (asset) => {
        let range = assetList[asset];
        range = range === undefined ? ['R25_1000000'] : range;
        return range.map((r) => (
            <AvGroup className="mb-3">
                <Label for="selling">Selling {rangeToText(r)}</Label>
                <InputGroup><AvInput type="number" name={r} id={r} required /></InputGroup>
                <AvFeedback>Please enter a valid amount</AvFeedback>
            </AvGroup>
        ));
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
                    
                    {modal ? renderInputs(asset) : null}
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
