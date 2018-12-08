import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions/index';

export function* purchaseBurgerSaga(action) {
    console.log('Purchase burger saga started');
    yield put(actions.purchaseBurgerStart());
    try {
        console.log('Before axios');
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
        console.log('after axions')
        yield put(actions.purchaseBurgerSucess(response.data.name, action.orderData))
        console.log('after put')
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error))
    }
}