import React from 'react';

const AddPurchaseList = props => {

  
    return (
        <span>
            <input 
                value={props.nameValue}
                placeholder='nowa lista zakupów'
                onChange={props.newListName}/>
                <button onClick={props.saveNewList}>dodaj listę</button>
        </span>
    );
}

export default AddPurchaseList;