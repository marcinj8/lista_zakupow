import React from 'react';

const NavigationPurchaseList = props => {

    const navigationData = { ...props.navigationItems };
    const navigation = Object.keys(navigationData).map(
        item => (
            <option
                defaultValue={props.currentList === item ? true : false}
                selected={props.currentList === item ? true : false}
                className=''
                value={item}
                key={item}>{navigationData[item].name}</option>
        )
    );
    return (
        <article>
            <label >Wybierz listę</label>
            <select
                onChange={(e) => props.setCurrentList(e.target.value)}
            >
                {navigation}
            </select>
        </article>
    )
};

export default NavigationPurchaseList;