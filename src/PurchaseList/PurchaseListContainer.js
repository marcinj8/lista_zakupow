import React, { Component } from 'react';
import axios from 'axios';

import NavigationPurchaseList from './NavigationPurchaseList';
import PurchaseLists from './PurchaseLists';

const cors = 'https://cors-anywhere.herokuapp.com/';
const firebaseAddress = 'https://zakupy-aab3c.firebaseio.com/';


class PurchaseListContainer extends Component {
    state = {
        purchaseLists: null,
        loading: false,
        error: false,
    }

    componentDidMount() {
        this.setPurchaseList();
    }

    componentDidUpdate() {
        if (!this.props.isAppUpdated && !this.state.loading && this.state.purchaseLists !== null) {
            this.setPurchaseList();
        }
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
        console.log(error)
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
        this.setLadingToTrue();
        this.getData();
    }

    pushDataOnServer = (item, itemId) => {
        const listName = this.props.currentList;
        const link = firebaseAddress + this.props.currentList +'/items/' + itemId
        console.log(item, link)
        // axios.put() dodać połączenie przed czy po setstate
    }

    changePurchaseStatusHandler = itemId => {
        console.log(itemId)
        const purchaseListsUpdated = { ...this.state.purchaseLists };
        const currentItem = { ...purchaseListsUpdated[this.props.currentList].items[itemId] };

        currentItem.purchased = !purchaseListsUpdated[this.props.currentList].items[itemId].purchased;
        purchaseListsUpdated[this.props.currentList].items[itemId] = currentItem;
        // axios.put()
        this.pushDataOnServer(currentItem, itemId)
        this.setState({
            purchaseLists: purchaseListsUpdated
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
                        changePurchaseStatus={this.changePurchaseStatusHandler}
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

        return (
            <div className='PurchaseList__container'>
                {purchaseListNavigation}
                {lists}
                {buttons}
            </div>
        )
    };
};

export default PurchaseListContainer;