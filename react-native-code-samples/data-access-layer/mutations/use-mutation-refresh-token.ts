import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { TokenRefresh } from '../../api-types';
import {
    writeAccessToken,
    writeRefreshToken,
} from '../../helpers/encrypted-storage-helpers';
import { displayToast } from '../../helpers/toast-helper';
import { authApi } from '../api-client';
import { MutationKeys } from '../query-keys';

export function useMutationRefreshToken() {
    const mutation = useMutation(
        (tokenRefresh: TokenRefresh) =>
            authApi.authTokenRefreshCreate(tokenRefresh),
        {
            mutationKey: [MutationKeys.RefreshTokenMutation],
            onSuccess: async (value) => {
                await writeAccessToken((value.data as any).access);
                await writeRefreshToken((value.data as any).refresh);
            },
            onError: (error: AxiosError) => {
                displayToast(error);
            },
        }
    );
    return mutation;
}

export default useMutationRefreshToken;
