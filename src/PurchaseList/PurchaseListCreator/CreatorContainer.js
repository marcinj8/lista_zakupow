import React from 'react';
import axios from 'axios';

import AddItem from './AddItem';
import AddPurchaseList from './AddPurchaseList';

// const CORS = 'https://cors-anywhere.herokuapp.com/';
const firebaseAddress = 'https://zakupy-aab3c.firebaseio.com/';

class CreatorContainer extends React.Component {
    state = {
        show: {
            newItem: false,
            newList: false
        },
        newItem: {
            nazwa: '',
            ile: '',
            notatka: '',
            purchased: false,
            alreadyOnList: false,
            isVisibleOnMainList: true
        },
        newList: {
            name: '',
            disabled: false,
            author: false,
        }
    }

    showAddFormHandler = containerName => {
        const showUpdated = this.state.show;
        Object.keys(showUpdated).map(item => showUpdated[item] = false);
        showUpdated[containerName] = !this.state.show[containerName];
        this.setState({
            show: showUpdated
        })
    }

    inputChangeHandler = e => {
        const eventTarget = e.target;
        const newItemUpdated = this.state.newItem;
        newItemUpdated[eventTarget.placeholder] = eventTarget.value;
        this.setState({
            newitem: newItemUpdated
        })
    }

    resetInput = () => {
        const newItemDefaultSettings = {
            nazwa: '',
            ile: '',
            notatka: '',
            purchased: false,
            alreadyOnList: false,
            visibleOnMain: true
        };
        const newListDefaultSettings = {
            name: '',
            disabled: false,
            author: false,
            defaultVisiblityOnMain: true
        };

        this.setState({
            newItem: newItemDefaultSettings,
            newList: newListDefaultSettings
        })
    }

    onAddedItem = res => {
        this.props.changeDataStatus('isAppUpdated', false);
        this.resetInput();
    }

    addItemHandler = () => {
        const listName = this.props.currentList;
        axios.post(firebaseAddress + listName + '/items.json', { ...this.state.newItem })
            .then(res => this.onAddedItem(res))
            .catch(err => console.log(err))
    }

    changeVisibilityHandler = e => {
        console.log(e.target.checked);
        const newItemUpdated = {...this.state.newItem};
        newItemUpdated.isVisibleOnMainList = e.target.checked;
        this.setState({
            newItem: newItemUpdated
        })
    }

    newListNameHandler = e => {
        const eventTarget = e.target;
        let newListUpdated = this.state.newList;
        newListUpdated.name = eventTarget.value;
        this.setState({
            newList: newListUpdated
        })
    }

    saveNewListHandler = () => {
        const newList = this.state.newList;
        this.props.changeDataStatus('isAppUpdated', false);
        console.log(newList)
        axios.post(firebaseAddress + '.json', { ...newList })
            .then(res => this.onAddedItem(res))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <div>
                    <button
                        onClick={() => this.showAddFormHandler('newItem')}>pozycja</button>
                    <button
                        onClick={() => this.showAddFormHandler('newList')}>lista</button>
                    <button onClick={this.props.addContainerToggler}>zamknij</button>
                </div>
                {
                    this.state.show.newItem
                        ? <AddItem
                            nameValue={this.state.newItem.nazwa}
                            quantityValue={this.state.newItem.ile}
                            noteValue={this.state.newItem.notatka}
                            checkBoxSelected={this.state.newItem.isVisibleOnMainList}
                            inputChanged={this.inputChangeHandler}
                            addItem={this.addItemHandler}
                            onChangeVisibility={this.changeVisibilityHandler}
                        />
                        : null
                }
                {
                    this.state.show.newList
                        ? <AddPurchaseList
                            nameValue={this.state.newList.name}
                            newListName={this.newListNameHandler}
                            saveNewList={this.saveNewListHandler}
                        />
                        : null
                }
            </div>
        )
    }
}

export default CreatorContainer;