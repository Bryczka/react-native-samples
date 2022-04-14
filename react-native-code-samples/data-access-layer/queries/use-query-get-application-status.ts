import { useQuery } from 'react-query';
import { useAuthContext } from '../../managers/auth-manager/auth-manager';
import { statusApi } from '../api-client';
import { QueryKeys } from '../query-keys';

export function useQueryGetApplicationStatus() {
    const { accessToken } = useAuthContext();
    const query = useQuery(
        [QueryKeys.ApplicationStatusQuery],
        async () => (await statusApi(accessToken).statusRead()).data,
        { cacheTime: 0, staleTime: 0 }
    );

    return query;
}

export default useQueryGetApplicationStatus;
