import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import { watchAuth, watchBurgerBuilder } from './store/sagas/index'

const rootReducer = combineReducers({
    builder: burgerBuilderReducer,
    order: orderReducer,
    orders: ordersReducer,
    auth: authReducer
});

const sagaMidleware = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk, sagaMidleware)
    )
);

sagaMidleware.run(watchAuth);
sagaMidleware.run(watchBurgerBuilder);

const app = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
