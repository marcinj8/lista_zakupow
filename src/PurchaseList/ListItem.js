import React from 'react';

const ListItem = props => {
    console.log(props.item.purchased)

    const itemStyle = {
        'color:' : props.item.purchased ? 'green' : 'auto'
    }
    return (
        <div className={itemStyle}>
            <span>{props.item.nazwa}</span>
            <span>{props.item.ile}</span>
            <span>{props.item.notatka}</span>
            <button >edytuj</button>
            <button onClick={props.changePurchaseStatus}>kupione/do kupienia</button>
            <button>skasuj</button>
        </div>
    )
}

export default ListItem;