import { createStore, combineReducers } from "redux";
import { app } from "./reducers/app";
import { user } from "./reducers/user";

export const store = createStore(combineReducers({
    app,
    user
}));
