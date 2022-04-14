import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { ResetPasswordConfirm } from '../../api-types';
import { authApi } from '../api-client';
import { MutationKeys } from '../query-keys';
import { displayToast } from '../../helpers/toast-helper';

export function useMutationNewPassword() {
    const mutation = useMutation(
        (resetPasswordConfirm: ResetPasswordConfirm) =>
            authApi.authConfirmResetPasswordCreate(resetPasswordConfirm),
        {
            mutationKey: [MutationKeys.NewPasswordMutation],
            onSuccess: () => {
                displayToast(
                    'Hasło ustawione pomyślnie',
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

export default useMutationNewPassword;
