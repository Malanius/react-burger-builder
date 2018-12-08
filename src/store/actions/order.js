import * as actionTypes from './actionTypes';

export const purchaseBurgerSucess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: purchaseBurgerFail,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return { type: actionTypes.PURCHASE_BURGER_START }
}

export const purchaseBurger = (orderData, token) => {
    return {
        type: actionTypes.PURCHASE_BURGER,
        orderData: orderData,
        token: token
    }
}

export const purchaseInit = () => {
    return { type: actionTypes.PURCHASE_INIT }
}