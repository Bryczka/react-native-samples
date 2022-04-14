import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { TokenObtainPair } from '../../api-types';
import { authApi } from '../api-client';
import { MutationKeys } from '../query-keys';
import {
    writeAccessToken,
    writeRefreshToken,
} from '../../helpers/encrypted-storage-helpers';
import { displayToast } from '../../helpers/toast-helper';

export function useMutationLogin() {
    const mutation = useMutation(
        (loginInput: TokenObtainPair) => authApi.authTokenCreate(loginInput),
        {
            mutationKey: [MutationKeys.LoginMutation],
            onSuccess: async (value) => {
                await writeAccessToken(
                    (value.data as unknown as { access: string }).access
                );
                await writeRefreshToken(
                    (value.data as unknown as { refresh: string }).refresh
                );
            },
            onError: (error: AxiosError) => {
                displayToast(error);
            },
        }
    );
    return mutation;
}

export default useMutationLogin;
