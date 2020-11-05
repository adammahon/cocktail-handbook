import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Model } from '@vuex-orm/core';

export default ({ $axios }: { $axios: NuxtAxiosInstance }) => {
    // @ts-ignore - Ignore next line because of version inconsistency in types between NuxtAxiosInstance and AxiosInstance. Functionally, both types are the same
    Model.setAxios($axios);
};
