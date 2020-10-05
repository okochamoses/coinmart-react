import React from 'react';

const InfoBar = ({ activeTab, selectedCrypto, amount, txnType }) => {


    const renderRate = () => {
        console.log(selectedCrypto[txnType])
        if(Array.isArray(selectedCrypto[txnType])) {
            return selectedCrypto[txnType][0].amount;
        }
        return selectedCrypto[txnType];
    }
    console.log(selectedCrypto)
    console.log("AMOUNT", amount)
    let totalPayable =
        selectedCrypto[txnType] === undefined
            ? ''
            : `${(renderRate() * amount).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}`;
    let rate =
        selectedCrypto[txnType] === undefined
            ? '--'
            : `${renderRate().toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })} / $`;

    const getAmountFromRange = () => {
        const variableRates = selectedCrypto[txnType];
        console.log(variableRates)
        variableRates.forEach(r => {
            if (r.startAmount <= amount && r.endAmount > amount) {
                rate = r.amount
            }
        })
        totalPayable =  `${(rate * amount).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}`
        rate = `${rate.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })} / $`
        return rate;
    }

    if (selectedCrypto.cryptocurrency !== undefined && amount !== "0.00" && txnType !== "") { getAmountFromRange() }
    if (selectedCrypto.giftCard !== undefined && amount !== "0.00" && txnType !== "") { getAmountFromRange() }
    return (
        <React.Fragment>
            <img
                src={selectedCrypto.asset === undefined ? '' : selectedCrypto.asset.image}
                style={{ width: 'inherit' }}
                alt=""
            />
            <br />
            <div className="table-responsive">
                <table className="table table-borderless mb-0 text-muted">
                    <tbody>
                        <tr>
                            <th scope="row">{selectedCrypto.asset === undefined ? '' : 'Name'}</th>
                            <td>{selectedCrypto.asset === undefined ? '' : selectedCrypto.asset.name}</td>
                        </tr>
                        {activeTab === '1' ? (
                            <tr>
                                <th scope="row">Types</th>
                                <td>{selectedCrypto.cardType}</td>
                            </tr>
                        ) : null}
                        <tr>
                            <th scope="row">Amount</th>
                            <td>${amount}</td>
                        </tr>
                        <tr>
                            <th scope="row">Rate</th>
                            <td>{rate}</td>
                        </tr>
                    </tbody>
                </table>

                <h3 style={{ textAlign: 'center' }}>{totalPayable}</h3>
            </div>
        </React.Fragment>
    );
};

export default InfoBar;
