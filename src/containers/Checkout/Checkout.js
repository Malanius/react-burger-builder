import React, { Component } from 'react';
import queryString from 'query-string';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export default class extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        this.updateIngredients();
        //console.log(this.state.ingredients);
    }

    updateIngredients = () => {
        const values = queryString.parse(this.props.location.search);
        this.setState({
            ingredients: {
                //The + converts the string to the nubmer
                salad: values.salad ? +values.salad : 0,
                bacon: values.bacon ? +values.bacon : 0,
                cheese: values.cheese ? +values.cheese : 0,
                meat: values.meat ? +values.meat : 0
            },
            totalPrice: values.totalPrice ? +values.totalPrice : 0
        })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.path + '/contact'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
            </div>
        )
    }
}
