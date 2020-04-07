import React from 'react';

import ListItem from './ListItem';

const PurchaseList = props => {
    if (!props.purchaseList.items) {
        return 'lista jest pusta'
    }
    const purchaseList = Object.keys(props.purchaseList.items).map(
        item => (
            <ListItem
                changePurchaseStatus={() => props.changePurchaseStatus(item)}
                key={item}
                item={{ ...props.purchaseList.items[item] }}
            />
        )
    );
    return purchaseList
}

export default PurchaseList;