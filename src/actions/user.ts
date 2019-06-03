export const SIGN_IN = "SIGN_IN";
export function signIn(username: string, password: string) {
    return {
        type: SIGN_IN,
        username
    };
}

export const SIGN_OUT = "SIGN_OUT";
export function signOut() {
    return {
        type: SIGN_OUT
    }
}

export const REGISTER = "REGISTER";
export function register(username: string, password: string) {
    return {
        type: REGISTER,
        username,
        password
    }
}