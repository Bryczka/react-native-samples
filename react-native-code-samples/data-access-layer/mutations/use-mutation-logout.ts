import { QueryClient, useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { authApi } from '../api-client';
import { MutationKeys, QueryKeys } from '../query-keys';
import { clearStoredData } from '../../helpers/encrypted-storage-helpers';
import { displayToast } from '../../helpers/toast-helper';

export function useMutationLogout() {
    const queryClient = new QueryClient();
    const mutation = useMutation(() => authApi.authLogoutCreate(), {
        mutationKey: [MutationKeys.LogoutMutation],
        onMutate: async () => {
            await clearStoredData();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(QueryKeys.ApplicationStatusQuery);
            displayToast('Wylogowano pomyślnie', 'Operacja udana', 'success');
        },
        onError: (error: AxiosError) => {
            displayToast(error);
        },
    });
    return mutation;
}

export default useMutationLogout;
