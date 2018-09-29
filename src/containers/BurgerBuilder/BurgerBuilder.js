import React, { Component } from 'react';

import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        //Fake ingedients right now
        this.setState({
            ingredients: {
                salad: 1,
                bacon: 1,
                cheese: 1,
                meat: 1
            }, purchasable: true
        })
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = oldPrice + priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const oldPrice = this.state.totalPrice;
        const priceDeduction = INGREDIENT_PRICES[type];
        const newPrice = oldPrice - priceDeduction;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelledHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // this.setState({ loading: true });
        // //.json for firebase only
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     //dummy data
        //     customer: {
        //         name: 'Mal',
        //         address: {
        //             street: 'Universal 96',
        //             zipcode: '654321',
        //             country: 'Universe'
        //         },
        //         email: 'dont.even@try.it'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({ loading: false, purchasing: false });
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false, purchasing: false });
        //     });

        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let burgerView = this.state.error ? <p>This is seriosly broken, can't load ingredients!</p> : <Spinner />;

        if (this.state.ingredients) {
            burgerView = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelledHandler}
                purchaseContinued={this.purchaseContinueHandler} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelledHandler}>
                    {orderSummary}
                </Modal>
                {burgerView}
            </Aux >
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);