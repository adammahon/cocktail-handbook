<template>
    <v-card-base title="Search Results">
        <template v-slot:top>
            <v-list>
                <v-list-item v-if="drinks.length < 1">
                    <v-list-item-content>
                        <v-list-item-title>
                            No cocktails records found
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item-group v-else>
                    <template
                        v-for="({ id, name, thumbnail }, index) in drinks"
                    >
                        <v-list-item :key="id" :to="`drink/${id}`">
                            <v-list-item-avatar>
                                <v-img :src="thumbnail" :alt="name" />
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ name }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-divider
                            v-if="index < drinks.length - 1"
                            :key="index"
                        ></v-divider>
                    </template>
                </v-list-item-group>
            </v-list>
        </template>
    </v-card-base>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

// Models
import Drink from '@/models/Drink';

/**
 * The CardListCocktail component
 * @public
 *
 * @class
 * @extends {Vue}
 */
@Component
export default class CardListCocktail extends Vue {
    // Property to hold the selected drink
    public selectedDrink: Drink | null = null;

    /**
     * The drinks to be rendered in the list
     * @public
     *
     * @returns {object[]} - The drinks to be rendered in the list
     */
    public get drinks(): { id: string; name: string; thumbnail: string }[] {
        // Get the drinks from the store
        const drinks = Drink.query().orderBy('strDrink').all();

        // Map the drink models to the list view model
        return drinks.map(drink => ({
            id: drink.idDrink,
            name: drink.strDrink,
            thumbnail: drink.strDrinkThumb
        }));
    }
}
</script>
