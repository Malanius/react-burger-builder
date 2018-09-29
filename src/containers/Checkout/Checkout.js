import React, { Component } from 'react';
import queryString from 'query-string';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export default class extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }

    componentDidMount() {
        this.updateIngredients();
        console.log(this.state.ingredients);
    }

    updateIngredients = () => {
        const values = queryString.parse(this.props.location.search);
        this.setState({
            ingredients: {
                //The + converts the string to the nubmer
                salad: values.salad ? +values.salad : 0,
                bacon: values.bacon ? +values.bacon : 0,
                cheese: values.cheese ? +values.cheese : 0,
                meat: values.meat ? +values.meat : 0,
            }
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
                <Route path={this.props.match.path + '/contact'} component={ContactData}  />
            </div>
        )
    }
}
