import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { ResetPassword } from '../../api-types';
import { authApi } from '../api-client';
import { MutationKeys } from '../query-keys';
import { displayToast } from '../../helpers/toast-helper';

export function useMutationResetPassword() {
    const mutation = useMutation(
        (resetPassword: ResetPassword) =>
            authApi.authResetPasswordCreate(resetPassword),
        {
            mutationKey: [MutationKeys.ResetPasswordMutation],
            onSuccess: () => {
                displayToast('Zresetowano hasło', 'Operacja udana', 'success');
            },
            onError: (error: AxiosError) => {
                displayToast(error);
            },
        }
    );
    return mutation;
}

export default useMutationResetPassword;
