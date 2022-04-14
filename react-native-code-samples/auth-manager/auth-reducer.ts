import { AuthActions } from './auth-actions';

type AuthState = {
    accessToken?: string;
    refreshToken?: string;
    isAuthenticated: boolean;
};

export const initialState: AuthState = {
    accessToken: undefined,
    refreshToken: undefined,
    isAuthenticated: false,
};

export default (state: AuthState, action: AuthActions): AuthState => {
    switch (action.type) {
        case 'AUTH/LOGIN':
            return {
                ...state,
                accessToken: action.payload.access,
                refreshToken: action.payload.refresh,
                isAuthenticated: true,
            };
        case 'AUTH/LOGOUT':
            return {
                ...state,
                accessToken: undefined,
                refreshToken: undefined,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};
