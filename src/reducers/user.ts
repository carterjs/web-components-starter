import { Action } from "redux";
import { UserState } from "./types";
import { SIGN_IN, SIGN_OUT, REGISTER } from "../actions/user";
import { UserAction } from "../actions/types";
import { store } from "../store";
import { navigate } from "../actions/app";

const initialState: UserState = {
    signedIn: false
};

export function user(state = initialState, action: Action): UserState {
    console.log(action);
    switch(action.type) {
        case SIGN_IN:
            return Object.assign({}, state, {
                username: (action as UserAction).username,
                signedIn: true
            });
            break;
        case SIGN_OUT:
            return {
                signedIn: false
            };
            break;
        case REGISTER:
            return Object.assign({}, state, {
                username: (action as UserAction).username,
                signedIn: true
            });
            break;
    }
    return state;
}