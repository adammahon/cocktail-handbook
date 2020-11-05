import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { LooseObject } from '@/types';

export default ({
    app,
    $axios
}: {
    app: { $config: LooseObject };
    $axios: NuxtAxiosInstance;
}) => {
    $axios.setBaseURL(app.$config.baseApiUrl);
};
