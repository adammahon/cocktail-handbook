<template>
    <v-card-base title="Cocktail Search">
        <v-row>
            <v-col cols="8" md="10">
                <v-text-field
                    v-if="!showAutoComplete"
                    v-model="search"
                    :placeholder="`Search by ${searchType}`"
                    label="Search"
                    prepend-icon="mdi-glass-cocktail"
                    @input="onSearchDrink"
                />
                <v-autocomplete
                    v-else
                    v-model="search"
                    :items="searchItems"
                    :placeholder="`Search by ${searchType}`"
                    hide-no-data
                    hide-selected
                    item-text="label"
                    item-value="value"
                    label="Search"
                    prepend-icon="mdi-glass-cocktail"
                    return-object
                    @change="onSearchDrink"
                />
            </v-col>
            <v-col cols="4" md="2">
                <v-select
                    v-model="searchType"
                    :items="searchTypeItems"
                    item-text="label"
                    item-value="value"
                    label="Search Type"
                    @change="onSwitchSearchType"
                />
            </v-col>
        </v-row>
    </v-card-base>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { debounce } from 'debounce';

// Models
import Category from '@/models/Category';
import Glass from '@/models/Glass';
import Ingredient from '@/models/Ingredient';

// Types
import { SearchType } from '@/store/search';

/**
 * The CardFormSearchCocktail component
 * @public
 *
 * @class
 * @extends {Vue}
 */
@Component
export default class CardFormSearchCocktail extends Vue {
    // The search and search type
    public search: string | { label: string; value: string } = '';
    public searchType = SearchType.name;

    /**
     * Gets the items for when search type is set to category
     * @public
     *
     * @returns {object[]} - The category items for the autocomplete
     */
    public get categoryItems(): { label: string; value: string }[] {
        const categories = Category.all();
        return categories.map(c => ({
            label: c.strCategory,
            value: c.strCategory
        }));
    }

    /**
     * Gets the items for when search type is set to glass
     * @public
     *
     * @returns {object[]} - The glass items for the autocomplete
     */
    public get glassItems(): { label: string; value: string }[] {
        const glasses = Glass.all();
        return glasses.map(g => ({
            label: g.strGlass,
            value: g.strGlass
        }));
    }

    /**
     * Gets the items for when search type is set to ingredient
     * @public
     *
     * @returns {object[]} - The ingredient items for the autocomplete
     */
    public get ingredientItems(): { label: string; value: string }[] {
        const ingredients = Ingredient.all();
        return ingredients.map(i => ({
            label: i.strIngredient1,
            value: i.strIngredient1
        }));
    }

    /**
     * Boolean that determines if the v-autocomplete should be rendered or the generic search bar
     * @public
     *
     * @returns {boolean} - Returns a boolean indicating if the v-autocomplete should be rendered
     */
    public get showAutoComplete(): boolean {
        return this.searchType !== SearchType.name;
    }

    /**
     * The autocomplete items to be returned to the search bar
     * @public
     *
     * @returns {object} - Returns a mapped version of all the search results in a format that the v-autocomplete component can understand
     * @property {string} label - The item label displayed to the user
     * @property {string} value - The item value
     */
    public get searchItems(): { label: string; value: string }[] {
        switch (this.searchType) {
            case SearchType.category:
                return this.categoryItems;
            case SearchType.glass:
                return this.glassItems;
            case SearchType.ingredient:
                return this.ingredientItems;
            default:
                throw new Error('Unknown or unsupported search type provided');
        }
    }

    /**
     * The items to be returned to the search type dropdown
     * @public
     *
     * @returns {string[]} - All the search type items
     */
    public get searchTypeItems(): string[] {
        return Object.values(SearchType);
    }

    /**
     * Event handler that resets various search details when changing search type
     * @public
     *
     * @returns {void}
     */
    public async onSwitchSearchType(): Promise<void> {
        // Reset the drinks from the store
        await this.$store.dispatch('search/reset');

        // Reset the search text
        this.search = '';
    }

    /**
     * Event handler that executes a drink search based upon the user's input
     * @public
     *
     * @param {object | string} search - The search text or the selected item from the autocomplete
     * @property {string} value - The value of the select item
     *
     * @returns {void}
     */
    public onSearchDrink(search: string | { value: string }): void {
        // Debounce the search to prevent overloading the API
        debounce(() => {
            // Get the search text
            let val = search;
            if (typeof search !== 'string') {
                val = search.value;
            }

            // Execute the drink search
            this.$store.dispatch('search/execute', {
                search: val,
                searchType: this.searchType
            });
        }, 200)();
    }

    /**
     * Hook for setting the search and search type data properties to the values stored in state
     * @public
     *
     * @returns {void}
     */
    public created(): void {
        const { searchText, searchType } = this.$store.state.search;

        // Set the search type from the store if possible
        if (searchType) {
            this.searchType = searchType;
        }

        // Set the search text from the store if possible
        if (searchText) {
            if (this.searchType === SearchType.name) {
                this.search = searchText;
            } else {
                this.search = {
                    label: searchText,
                    value: searchText
                };
            }
        }
    }
}
</script>
