import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { CreateUser } from '../../api-types';
import { usersApi } from '../api-client';
import { MutationKeys } from '../query-keys';
import { displayToast } from '../../helpers/toast-helper';

export function useMutationRegister() {
    const mutation = useMutation(
        (createUser: CreateUser) => usersApi.usersCreate(createUser),
        {
            mutationKey: [MutationKeys.RegisterMutation],
            onSuccess: () => {
                displayToast(
                    'Rejestracja pomyślna',
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

export default useMutationRegister;
