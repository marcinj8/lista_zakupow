import React from 'react';

import PurchaseList from './PurchaseList';

const PurchaseLists = props => {

    const purchaseLists = Object.keys(props.purchaseLists).map(
        list => {
            if (list !== props.currentList) {
                return null
            }
            return (
                <PurchaseList
                    changePurchaseStatus={props.changePurchaseStatus}
                    key={list} purchaseList={props.purchaseLists[list]}
                />
            )
        }
    )

    return purchaseLists
};

export default PurchaseLists;