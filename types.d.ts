import Vue from 'vue';
import BaseService from '@/services/Base';

//
declare module '*.vue' {
    export default Vue;
}

//
declare module '@vuex-orm/core' {
    namespace Model {
        let Service: any;
        function service<T extends BaseService>(options?: LooseObject): T;
    }
}

//
export interface LooseObject {
    [key: string]: any;
}
