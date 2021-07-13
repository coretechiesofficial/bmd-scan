import { createStore, combineReducers, applyMiddleware } from 'redux';
import Userreducer from '../store/reducers/Userreducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    Userreducer,
});

export const store = createStore(rootReducer,applyMiddleware(thunk));