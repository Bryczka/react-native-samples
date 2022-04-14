import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react';
import { RootStackParamList } from '../../navigation/navigation-stack';
import { TokenObtainPair, TokenRefresh } from '../../api-types';
import useMutationLogin from '../../data-access-layer/mutations/use-mutation-login';
import useMutationRefreshToken from '../../data-access-layer/mutations/use-mutation-refresh-token';
import {
    readAccessToken,
    readRefreshToken,
    writeAccessToken,
    writeRefreshToken,
} from '../../helpers/encrypted-storage-helpers';
import { isValid } from '../../helpers/token-helpers';
import { login, logout } from './auth-actions';
import authReducer, { initialState } from './auth-reducer';
import useMutationLogout from '../../data-access-layer/mutations/use-mutation-logout';

interface AuthContextType {
    accessToken?: string;
    refreshToken?: string;
    handleLogin: (userCredential: TokenObtainPair) => Promise<void>;
    handleLogout: () => void;
    handleRelogin: () => Promise<void>;
    isLogging: boolean;
    isLoggingOut: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('Component beyond AuthContext');
    }
    return ctx;
};

export const AuthManager: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const { mutateAsync: loginMutation, isLoading: isLogging } =
        useMutationLogin();
    const { mutateAsync: refreshTokenMutation } = useMutationRefreshToken();
    const { mutateAsync: logoutMutation, isLoading: isLoggingOut } =
        useMutationLogout();
    const { navigate } =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, 'StartScreen'>
        >();

    const handleRelogin = useCallback(async () => {
        const accessToken = await readAccessToken();
        const refreshToken = await readRefreshToken();
        if (accessToken && refreshToken) {
            if (!isValid(accessToken)) {
                if (isValid(refreshToken)) {
                    refreshTokenMutation(
                        refreshToken as unknown as TokenRefresh
                    );
                    navigate('NavigationBottomSignedIn');
                }
            }
            dispatch(login(accessToken, refreshToken));
            navigate('NavigationBottomSignedIn');
        }
    }, [navigate, refreshTokenMutation]);

    useEffect(() => {
        handleRelogin();
    }, [handleRelogin]);

    const handleLogin = useCallback(
        async (userCredential: TokenObtainPair) => {
            const apiResponse = await loginMutation(userCredential);
            const { access } = apiResponse.data as any;
            const { refresh } = apiResponse.data as any;
            writeAccessToken(access);
            writeRefreshToken(refresh);
            dispatch(login(access, refresh));
            navigate('NavigationBottomSignedIn');
        },
        [loginMutation, navigate]
    );

    const handleLogout = useCallback(async () => {
        await logoutMutation();
        dispatch(logout());
        navigate('StartScreen');
    }, [logoutMutation, navigate]);

    const contextValues: AuthContextType = useMemo(
        () => ({
            accessToken: state.accessToken,
            refreshToken: state.refreshToken,
            handleLogin,
            handleLogout,
            handleRelogin,
            isLogging,
            isLoggingOut,
            isAuthenticated: state.isAuthenticated,
        }),
        [
            state.accessToken,
            state.refreshToken,
            state.isAuthenticated,
            handleLogin,
            handleLogout,
            handleRelogin,
            isLogging,
            isLoggingOut,
        ]
    );
    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};
