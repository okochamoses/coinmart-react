import React from 'react';

const InfoBar = ({ activeTab, selectedCrypto, amount, txnType }) => {
    const totalPayable =
        selectedCrypto[txnType] === undefined
            ? ''
            : `${(selectedCrypto[txnType] * amount).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}`;
    const rate =
        selectedCrypto[txnType] === undefined
            ? '--'
            : `${selectedCrypto[txnType].toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })} / $`;
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
