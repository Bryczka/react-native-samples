import EncryptedStorage from 'react-native-encrypted-storage';
import { displayToast } from './toast-helper';

enum EncryptedStorageItems {
    ACCESS_TOKEN = 'ACCESS_TOKEN',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export const writeAccessToken = async (accessToken: string) => {
    try {
        await EncryptedStorage.setItem(
            EncryptedStorageItems.ACCESS_TOKEN,
            accessToken
        );
    } catch (error) {
        displayToast(
            'Automatyczne logowanie nie będzie możliwe',
            'Wystąpił błąd zapisu tokenów',
            'error'
        );
    }
};

export const writeRefreshToken = async (refreshToken: string) => {
    try {
        await EncryptedStorage.setItem(
            EncryptedStorageItems.REFRESH_TOKEN,
            refreshToken
        );
    } catch (error) {
        displayToast(
            'Automatyczne logowanie nie będzie możliwe',
            'Wystąpił błąd zapisu tokenów',
            'error'
        );
    }
};

export const readAccessToken = async () => {
    try {
        const accessToken = await EncryptedStorage.getItem(
            EncryptedStorageItems.ACCESS_TOKEN
        );
        return accessToken;
    } catch (error) {
        displayToast(
            'Wymagane ponowne logowanie',
            'Wystąpił błąd odczytywania tokenów',
            'error'
        );
        return undefined;
    }
};

export const readRefreshToken = async () => {
    try {
        const token = await EncryptedStorage.getItem(
            EncryptedStorageItems.REFRESH_TOKEN
        );
        return token;
    } catch (error) {
        displayToast(
            'Wymagane ponowne logowanie',
            'Wystąpił błąd odczytywania tokenów',
            'error'
        );
        return undefined;
    }
};

export const clearStoredData = async () => {
    try {
        await EncryptedStorage.removeItem(EncryptedStorageItems.REFRESH_TOKEN);
        await EncryptedStorage.removeItem(EncryptedStorageItems.ACCESS_TOKEN);
    } catch (error) {
        displayToast(
            'Błędnie wylogowano z aplikacji',
            'Wystąpił błąd usuwania tokenów',
            'error'
        );
    }
};
