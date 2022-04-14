import { useQuery } from 'react-query';
import { captchaApi } from '../api-client';
import { QueryKeys } from '../query-keys';

export function useQueryGetCaptcha() {
    const query = useQuery(
        [QueryKeys.CaptchaQuery],
        async () => (await captchaApi.captchaRead()).data
    );
    return query;
}

export default useQueryGetCaptcha;
