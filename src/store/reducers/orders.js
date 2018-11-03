import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../util';

const initialState = {
    orders: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, { loading: true });

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {
                orders: action.orders,
                loading: false
            });

        case actionTypes.FETCH_ORDERS_FAILED:
            return updateObject(state, { loading: false });

        default:
            return state;
    }
}

export default reducer;