export const LOGOUT = 'AUTH/LOGOUT' as const;
export const LOGIN = 'AUTH/LOGIN' as const;

export const login = (access: string, refresh: string) => ({
    type: LOGIN,
    payload: { access, refresh },
});

type Login = ReturnType<typeof login>;

export const logout = () => ({
    type: LOGOUT,
});

type Logout = ReturnType<typeof logout>;

export type AuthActions = Logout | Login;
