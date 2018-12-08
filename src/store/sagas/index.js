import { takeEvery, takeLatest, all } from 'redux-saga/effects'

import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga } from './order';
import { fetchOrdersSaga } from './orders';

import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    //Runs concurently
    yield all(
        [
            takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
            takeEvery(actionTypes.ATUH_CHECK_TIMETOUT, checkAuthTimeoutSaga),
            takeEvery(actionTypes.AUTH_USER, authUserSaga),
            takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
        ]
    );

}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    //Cancels previous invocations and uses latest one
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
}

export function* watchOrders() {
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}