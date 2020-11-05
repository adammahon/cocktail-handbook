<template>
    <v-row>
        <v-col cols="12">
            <v-row>
                <v-col cols="12">
                    <card-form-search-cocktail />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="8">
                    <card-list-cocktail />
                </v-col>
                <v-col cols="12" md="4">
                    <CardSnapshotDrink
                        v-if="!!recommendedDrink"
                        :drink="recommendedDrink"
                        title="Recommending"
                    />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

// Models
import Category from '@/models/Category';
import Drink from '@/models/Drink';
import Glass from '@/models/Glass';
import Ingredient from '@/models/Ingredient';

// Services
import CategoryService from '@/services/Category';
import DrinkService from '@/services/Drink';
import GlassService from '@/services/Glass';
import IngredientService from '@/services/Ingredient';

/**
 * The index page
 * @public
 *
 * @class
 * @extends {Vue}
 */
@Component({
    /**
     * Method that sets various html metadata fields for the page
     * @public
     *
     * @param {IndexPage} this - The index page instance
     *
     * @returns {void}
     */
    head(this: IndexPage): object {
        return {
            title: 'Cocktail Search'
        };
    },
    /**
     * Middleware that ensures all categories, glasses, and ingredients have been loaded into the store before render
     * @public
     *
     * @returns {void}
     */
    async middleware(): Promise<void> {
        // Array to hold all the service calls
        const serviceCalls = [];

        // Get all relatd type information from the store
        const categories = Category.all();
        const glasses = Glass.all();
        const ingredients = Ingredient.all();

        // Get all categories if none are in the store
        if (categories.length < 1) {
            serviceCalls.push(Category.service<CategoryService>().fetchAll());
        }

        // Get all glasses if none are in the store
        if (glasses.length < 1) {
            serviceCalls.push(Glass.service<GlassService>().fetchAll());
        }

        // Get all ingredients if none are in the store
        if (ingredients.length < 1) {
            serviceCalls.push(
                Ingredient.service<IngredientService>().fetchAll()
            );
        }

        // Wait for all the service calls to finish
        // @ts-ignore
        await Promise.all(serviceCalls);
    },
    /**
     * Hook that fetches the recommended drink
     * @public
     *
     * @param {IndexPage} this - The index page instance
     *
     * @returns {void}
     */
    async fetch(this: IndexPage): Promise<void> {
        const service = Drink.service<DrinkService>();
        this.recommendedDrink = await service.fetchOneRandomly();
    }
})
export default class IndexPage extends Vue {
    /**
     * The recommended drink
     * @public
     *
     * @type {Drink}
     */
    public recommendedDrink: Drink | null = null;
}
</script>
