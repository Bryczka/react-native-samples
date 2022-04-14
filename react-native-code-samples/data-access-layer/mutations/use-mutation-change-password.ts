import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { ChangePassword } from '../../api-types';
import { authApiWithCredentials } from '../api-client';
import { MutationKeys } from '../query-keys';
import { displayToast } from '../../helpers/toast-helper';
import { useAuthContext } from '../../managers/auth-manager/auth-manager';

export function useMutationChangePassword() {
    const { accessToken } = useAuthContext();
    const mutation = useMutation(
        (changePassword: ChangePassword) =>
            authApiWithCredentials(accessToken).authChangePasswordCreate(
                changePassword
            ),
        {
            mutationKey: [MutationKeys.ChangePasswordMutation],
            onSuccess: () => {
                displayToast(
                    'Hasło zmienione pomyślnie',
                    'Operacja udana',
                    'success'
                );
            },
            onError: (error: AxiosError) => {
                displayToast(error);
            },
        }
    );
    return mutation;
}

export default useMutationChangePassword;
