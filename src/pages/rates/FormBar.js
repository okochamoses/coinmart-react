import React from 'react';
import { Form, FormGroup, FormText, Input, Label } from 'reactstrap';
import Select from 'react-select';
import Modals from './Modal';

const InfoBar = ({
    activeTab,
    tab,
    updateAmounr,
    updateCryptoImage,
    updateGiftCardImage,
    updateTxnType,
    parentState,
}) => {
    const renderOptions = () => {
        const options = [
            {
                value: 'selling',
                label: 'Sell',
            },
        ];
        if (activeTab === '2') {
            options.push({
                value: 'buying',
                label: 'Buy',
            });
        }
        return options;
    };
    return (
        <React.Fragment>
            <Form>
                <FormGroup>
                    <Label for="text">Asset</Label>
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        options={tab.rates.map((rate) => {
                            return {
                                value: rate.asset.name,
                                label: rate.asset.name,
                            };
                        })}
                        defaultValue={parentState.defaultSelect}
                        onChange={activeTab === '1' ? updateGiftCardImage : updateCryptoImage}></Select>
                </FormGroup>
                <FormGroup>
                    <Label for="text">Transaction Type</Label>
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        options={renderOptions()}
                        onChange={updateTxnType}></Select>
                </FormGroup>
                <FormGroup>
                    <Label for="text">Amount</Label>
                    <Input
                        type="number"
                        name="amount"
                        id="text"
                        min={50}
                        placeholder="Enter amount"
                        onChange={updateAmounr}
                    />

                    <FormText>Minimum gift card amount: $50</FormText>
                </FormGroup>
                <Modals activeTab={activeTab} parentState={parentState} />
            </Form>
        </React.Fragment>
    );
};

export default InfoBar;
