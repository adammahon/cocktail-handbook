import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators';

// Models & Services
import Drink from '@/models/Drink';
import DrinkService from '~/services/Drink';

/**
 * Enum for all support search types
 * @enum {string}
 * @public
 */
export enum SearchType {
    name = 'Cocktail Name',
    ingredient = 'Ingredients',
    category = 'Category',
    glass = 'Glass'
}

/**
 * Module responsible for the cocktail search
 * @public
 *
 * @class
 * @extends {VuexModule}
 */
@Module({ name: 'search', namespaced: true, stateFactory: true })
export default class Search extends VuexModule {
    /* ********************** */
    /* ** State Properties ** */
    /* ********************** */

    /**
     * The search string
     * @public
     * @type {string}
     */
    public searchText: string = '';

    /**
     * The type of search being performed
     * @public
     * @type {string}
     */
    public searchType: SearchType | null = null;

    /* *************** */
    /* ** Mutations ** */
    /* *************** */

    /**
     * Sets the search details
     * @public
     *
     * @param {object} payload - The mutation's payload
     * @property {string} search - The search string
     * @property {SearchType} searchType - The type of search being performed
     *
     * @returns {void}
     */
    @Mutation
    public setSearch({
        search,
        searchType
    }: {
        search: string;
        searchType: SearchType;
    }): void {
        this.searchText = search;
        this.searchType = searchType;
    }

    /**
     * Resets the search details stored in state
     * @public
     *
     * @returns {void}
     */
    @Mutation
    public resetSearch(): void {
        this.searchText = '';
        this.searchType = null;
    }

    /* ************* */
    /* ** Actions ** */
    /* ************* */

    /**
     * Resets the search results and details
     * @public
     *
     * @returns {void}
     */
    @Action
    public async reset(): Promise<void> {
        this.context.commit('resetSearch');
        await Drink.deleteAll();
    }

    /**
     * Resets the search
     * @public
     *
     * @param {object} payload - The mutation's payload
     * @property {string} search - The search string
     * @property {SearchType} searchType - The type of search being performed
     *
     * @returns {void}
     */
    @Action({ rawError: true })
    public async execute({
        search,
        searchType
    }: {
        search: string;
        searchType: SearchType;
    }): Promise<void> {
        // Reset the search results and details
        await this.context.dispatch('reset');

        // Set the search string and search type in state
        this.context.commit('setSearch', { search, searchType });

        // Hold a reference to the drink service
        const service = Drink.service<DrinkService>();

        // Execute the appropriate drink service method depending upon the search type
        switch (searchType) {
            case SearchType.category:
                await service.fetchManyByCategory(search);
                break;
            case SearchType.glass:
                await service.fetchManyByGlass(search);
                break;
            case SearchType.ingredient:
                await service.fetchManyByIngredient(search);
                break;
            case SearchType.name:
                await service.fetchManyByName(search);
                break;
        }
    }
}
