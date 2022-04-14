import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { CreateRecruitmentApplication } from '../../api-types';
import { applicationApiWithCredentials } from '../api-client';
import { MutationKeys } from '../query-keys';
import { displayToast } from '../../helpers/toast-helper';
import { useAuthContext } from '../../managers/auth-manager/auth-manager';

export function useMutationCreateRecruitment() {
    const { accessToken } = useAuthContext();
    const mutation = useMutation(
        (createRecruitmentApplication: CreateRecruitmentApplication) =>
            applicationApiWithCredentials(accessToken).applicationCreate(
                createRecruitmentApplication
            ),
        {
            mutationKey: [MutationKeys.CreateRecruitmentMutation],
            onSuccess: () => {
                displayToast(
                    'Zgłoszenie zostało przesłane pomyślnie',
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

export default useMutationCreateRecruitment;
