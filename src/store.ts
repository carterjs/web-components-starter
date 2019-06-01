import { createStore, combineReducers } from "redux";
import { app } from "./reducers/app";

export const store = createStore(combineReducers({
    app
}));
