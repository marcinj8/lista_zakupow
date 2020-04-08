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
            <label>
                <input
                    onChange={props.onChangeVisibility}
                    checked={props.checkBoxSelected}
                    type='checkbox' />
                Widoczne na głównej liście</label>
            <button onClick={props.addItem}>{props.button ? props.button : 'Dodaj'}</button>
        </span>
    );
}

export default AddItem;