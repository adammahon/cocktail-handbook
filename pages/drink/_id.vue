<template>
    <v-row>
        <v-col cols="12">
            <v-btn to="/" text>
                <v-icon>mdi-arrow-left</v-icon>
                Back
            </v-btn>
        </v-col>
        <v-col cols="4">
            <card-snapshot-drink :drink="drink" />
        </v-col>
        <v-col cols="8">
            <card-drink-recipe :drink="drink" />
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

// Models & Services
import Drink from '@/models/Drink';
import DrinkService from '@/services/Drink';

/**
 * The drink details page
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
     * @param {DrinkDetailsPage} this - The drink details page instance
     *
     * @returns {void}
     */
    head(this: DrinkDetailsPage): object {
        return {
            title: this.drink?.strDrink
        };
    },
    /**
     * Middleware that fetches the drink details based off the id present in the URL
     * @public
     *
     * @returns {void}
     */
    async middleware({ route }): Promise<void> {
        const { id } = route.params;
        await Drink.service<DrinkService>().fetchOneById(id);
    }
})
export default class DrinkDetailsPage extends Vue {
    /**
     * The id of the drink to lookup and display the details for
     * @public
     *
     * @type {string}
     */
    public get drinkId(): string {
        return this.$route.params.id;
    }

    /**
     * The drink to display the details for
     * @public
     *
     * @type {Drink}
     */
    public get drink(): Drink | null {
        return Drink.find(this.drinkId);
    }
}
</script>
