import { combineReducers, createStore } from "redux";
import userReducer from "./redux/reducers/user.reducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';



const persistConfig = {
    key: 'CQ-user',
    storage,
}

const rootReducer = combineReducers({
    userDetails: userReducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
export default store;