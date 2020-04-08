import React, { Component } from 'react';
import axios from 'axios';

import NavigationPurchaseList from './NavigationPurchaseList';
import PurchaseLists from './PurchaseLists';
import AddItem from './PurchaseListCreator/AddItem';

const cors = 'https://cors-anywhere.herokuapp.com/';
const firebaseAddress = 'https://zakupy-aab3c.firebaseio.com/';


class PurchaseListContainer extends Component {
    state = {
        purchaseLists: null,
        loading: false,
        error: false,
        showItemEditor: false,
        editedItemData: null,
        editedItemId: null,
        showListEditor: false,
        autoSyncConfig: {
            sync: false,
            time: 90000,
            lastSync: 0
        }
    }

    componentDidMount() {
        this.setPurchaseList();
    }

    componentDidUpdate() {
        if (!this.props.isAppUpdated && !this.state.loading && this.state.purchaseLists !== null) {
            this.setPurchaseList();
        }
        // automatyczna synchronizacja -- this.state.autosyncConfig
    }

    setLadingToTrue() {
        this.setState({
            loading: true
        })
    }

    setLadingToFalse() {
        this.setState({
            loading: false
        })
    }

    savePurchaselist = lists => {
        const navigationItems = Object.keys(lists);
        if (this.state.purchaseLists === null) {
            this.props.setCurrentList(navigationItems[0]);
        }
        this.props.changeDataStatus('isAppUpdated', true);
        this.setState({
            purchaseLists: lists,
            loading: false,
        })
    }

    markAsPurchasedHandler = key => {
        console.log(key)
    }

    deleteItemHandler = key => {
        console.log(key)
    }

    errorHandler = error => {
        this.setState({
            error: true,
            loading: false
        })
    }

    getData = () => {
        axios.get(cors + firebaseAddress + '.json')
            .then(res => this.savePurchaselist(res.data))
            .catch(err => this.errorHandler(err))
    }

    setPurchaseList = () => {
        if (this.state.purchaseLists === null) {
            this.setLadingToTrue();
        }
        this.getData();
    }

    changeItemPurchasedStatus = purchaseListsUpdated => {
        console.log('updated')
        this.setState({
            purchaseLists: purchaseListsUpdated
        })
    }

    pushDataOnServer = (item, itemId, purchaseListsUpdated) => {
        const listName = this.props.currentList;
        const link = cors + firebaseAddress + listName + '/items/' + itemId + '.json'
        console.log(item, link)
        axios.put(link, { ...item })
            .then(this.changeItemPurchasedStatus(purchaseListsUpdated))
            .catch(err => console.log(err))

    }

    editorTogglerHandler = (itemId) => {
        const editedItem = { ...this.state.purchaseLists[this.props.currentList].items[itemId] };
        this.setState({
            editedItemData: editedItem,
            editedItemId: itemId
        })
        if (this.state.showItemEditor && itemId === this.state.editedItemId) {
            this.setState({
                showItemEditor: false
            })
        } else {
            this.setState({
                showItemEditor: true
            })
        }
    }

    changePurchaseStatusHandler = itemId => {
        const purchaseListsUpdated = { ...this.state.purchaseLists };
        const currentItem = { ...purchaseListsUpdated[this.props.currentList].items[itemId] };
        currentItem.purchased = !purchaseListsUpdated[this.props.currentList].items[itemId].purchased;
        purchaseListsUpdated[this.props.currentList].items[itemId] = currentItem;
        this.pushDataOnServer(currentItem, itemId, purchaseListsUpdated)

    }

    deleteItemFromPurchaseListHandler = itemId => {
        const listName = this.props.currentList;
        const link = cors + firebaseAddress + listName + '/items/' + itemId + '.json'
        axios.delete(link)
            .then(res => this.props.changeDataStatus('isAppUpdated', false))
            .catch(err => console.log(err))

    }

    editedItemInputChangeHandler = e => {
        const eventTarget = e.target;
        const editedItemUpdated = {...this.state.editedItemData};
        editedItemUpdated[eventTarget.placeholder] = eventTarget.value;
        this.setState({
            editedItemData: editedItemUpdated
        })
    }

    editedItemChangeVisibilityHandler = e => {
        console.log(e.target.checked);
        const editedItemUpdated = {...this.state.editedItemData};
        editedItemUpdated.isVisibleOnMainList = e.target.checked;
        this.setState({
            editedItemData: editedItemUpdated
        })
    }

    acceptChanges = () => {
        const purchaseListsUpdated = {...this.state.purchaseLists};
        console.log(purchaseListsUpdated, this.state.editedItemId)
        purchaseListsUpdated[this.props.currentList].items[this.state.editedItemId] = {...this.state.editedItemData};
        this.pushDataOnServer(this.state.editedItemData, this.state.editedItemId, purchaseListsUpdated);
        this.setState({
            showItemEditor: false
        })
    }

    render() {
        let purchaseListNavigation = 'Proszę poczekaj';
        let lists = <div className='purchaseList__loadingContainer'>trwa ładowanie</div>;
        let buttons = null;
        if (!this.state.loading) {
            if (this.state.purchaseLists !== null) {
                purchaseListNavigation = (
                    <NavigationPurchaseList
                        currentList={this.props.currentList}
                        setCurrentList={this.props.setCurrentList}
                        navigationItems={this.state.purchaseLists}
                    />
                );
                lists = (
                    <PurchaseLists
                        editorToggler={this.editorTogglerHandler}
                        changePurchaseStatus={this.changePurchaseStatusHandler}
                        onItemDelete={this.deleteItemFromPurchaseListHandler}
                        currentList={this.props.currentList}
                        purchaseLists={this.state.purchaseLists}
                    />
                );
                buttons = (
                    <div>
                        <button>usuń kupione</button>
                        <button>usuń wszystko</button>
                    </div>
                )
            } else if (this.state.error) {
                purchaseListNavigation = 'wystąpił błąd'
                lists = 'informacja o błędzie';
            }
        }
        console.log(this.state)
        return (
            <div className='PurchaseList__container'>
                {purchaseListNavigation}
                {lists}
                {buttons}
                <div>
                    {
                        this.state.showItemEditor
                            ? <AddItem
                                nameValue={this.state.editedItemData.nazwa}
                                quantityValue={this.state.editedItemData.ile}
                                noteValue={this.state.editedItemData.notatka}
                                checkBoxSelected={this.state.editedItemData.isVisibleOnMainList}
                                inputChanged={this.editedItemInputChangeHandler}
                                addItem={this.acceptChanges}
                                onChangeVisibility={this.editedItemChangeVisibilityHandler}
                                button='Popraw' />
                            : null
                    }
                </div>
            </div>
        )
    };
};

export default PurchaseListContainer;