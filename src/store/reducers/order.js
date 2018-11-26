import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/util';

const initialState = {
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false });

        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, { loading: true });

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return updateObject(state, {
                loading: false,
                purchased: true
            });

        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, { loading: false });

        default:
            return state;
    }
}

export default reducer;