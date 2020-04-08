import React from 'react';

const ListItem = props => {

    const itemStyle = {
        'color' : props.item.purchased ? 'green' : 'auto'
    }
    return (
        <div className={itemStyle}>
            <span>{props.item.nazwa}</span>
            <span>{props.item.ile}</span>
            <span>{props.item.notatka}</span>
            <button onClick={props.editorToggler}>edytuj</button>
            <button onClick={props.changePurchaseStatus}>{props.item.purchased ? 'do kupienia' : 'kupione' }</button>
            <button onClick={props.onItemDelete}>skasuj</button>
        </div>
    )
}

export default ListItem;