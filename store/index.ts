import { Store } from 'vuex';
import VuexORM from '@vuex-orm/core';
import database from '@/database';
import { initializeStores } from '@/utils/store-accessor';

// All vuex plugins to be installed
export const plugins = [
    VuexORM.install(database, { namespace: 'database' }),
    (store: Store<any>) => initializeStores(store)
];

// All initialized modules
export * from '@/utils/store-accessor';
