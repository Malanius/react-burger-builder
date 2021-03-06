import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'



export class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSeAuthRedirectTo('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelledHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    render() {
        const disableInfo = {
            ...this.props.ingredients
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let burgerView = this.props.error ? <p>This is seriosly broken, can't load ingredients!</p> : <Spinner />;

        if (this.props.ingredients) {
            burgerView = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAthenticated}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelledHandler}
                purchaseContinued={this.purchaseContinueHandler} />
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

const mapStateToProps = (state) => ({
    ingredients: state.builder.ingredients,
    totalPrice: state.builder.totalPrice,
    isAthenticated: state.auth.token !== null,
    error: state.builder.error
})

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onIngredientAdded: (ing) => dispatch(actions.addIngredient(ing)),
        onIngredientRemoved: (ing) => dispatch(actions.removeIngredient(ing)),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSeAuthRedirectTo: (path) => dispatch(actions.setAuthRedirectTo(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));