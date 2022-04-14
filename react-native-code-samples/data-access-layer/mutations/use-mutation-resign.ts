import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { resignApiWithCredentials } from '../api-client';
import { MutationKeys } from '../query-keys';
import { displayToast } from '../../helpers/toast-helper';
import { useAuthContext } from '../../managers/auth-manager/auth-manager';

export function useMutationResign() {
    const { accessToken } = useAuthContext();
    const mutation = useMutation(
        () => resignApiWithCredentials(accessToken).resignCreate(),
        {
            mutationKey: [MutationKeys.ResignMutation],
            onSuccess: () => {
                displayToast(
                    'Rezygnacja pomyślna',
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

export default useMutationResign;
