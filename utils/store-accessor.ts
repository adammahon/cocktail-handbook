import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Search from '@/store/search';

// All modules to be initialized
// eslint-disable-next-line import/no-mutable-exports
export let searchStore: Search;

/**
 * Initializes the store for all modules
 * @public
 *
 * @param {Store<any>} store - The store used to initialize all modules
 *
 * @returns {void}
 */
export function initializeStores(store: Store<any>): void {
    searchStore = getModule(Search, store);
}
