import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../util';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

const addIngredient = (state, action) => {
    const addedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, addedIngredient);
    const newState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, newState);
}

const removeIngredient = (state, action) => {
    const removedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngredients = updateObject(state.ingredients, removedIngredient);
    const newState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, newState);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
    })
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true })
}

export default (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);

        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);

        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action);

        default:
            return state;
    }
}
