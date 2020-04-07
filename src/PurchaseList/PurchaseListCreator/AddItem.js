import React from 'react';

const AddItem = props => {

    return (
        <span>
            <input
                value={props.nameValue}
                onChange={props.inputChanged}
                placeholder='nazwa' />
            <input
                value={props.quantityValue}
                onChange={props.inputChanged}
                placeholder='ile' />
            <input
                value={props.noteValue}
                onChange={props.inputChanged}
                placeholder='notatka' />
                <button onClick={props.addItem}>Dodaj</button>
        </span>
    );
}

export default AddItem;