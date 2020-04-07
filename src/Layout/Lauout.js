import React, { Component } from 'react';
import gsap from 'gsap';

import PurchaseListContainer from '../PurchaseList/PurchaseListContainer';
import CreatorContainer from '../PurchaseList/PurchaseListCreator/CreatorContainer';

import './Layout.scss';

class Layout extends Component {
    state = {
        showAddContainer: false,
        currentList: '',
        isAppUpdated: false,
        isServerUpdated: true
    }

    addContainerTogglerHandler = () => {
        this.setState({
            showAddContainer: !this.state.showAddContainer
        })
    }

    setCurrentListHandler = listName => {
        // console.log(listName.target.value)
        if (this.state.currentList === listName) {
            return
        }
        this.setState({
            currentList: listName
        })
    }

    changeDataStatusHandler = (type, status) => {
        this.setState({
            [type]: status
        })
    }

    render() {
        return (
            <div>
                {/* user data */}
                {this.state.showAddContainer
                    ? <CreatorContainer
                        changeDataStatus={this.changeDataStatus}
                        currentList={this.state.currentList}
                        changeDataStatus={this.changeDataStatusHandler}
                        addContainerToggler={this.addContainerTogglerHandler} />
                    : <button onClick={this.addContainerTogglerHandler}>dodaj</button>
                }
                <PurchaseListContainer
                    isAppUpdated={this.state.isAppUpdated}
                    isServerUpdated={this.state.isServerUpdated}
                    changeDataStatus={this.changeDataStatusHandler}
                    currentList={this.state.currentList}
                    setCurrentList={this.setCurrentListHandler}
                />
                {/* footer */}
            </div>
        )
    }
}

export default Layout;