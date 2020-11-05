<template>
    <v-card-base :title="drink.strDrink">
        <v-subheader>Ingredients</v-subheader>
        <v-list subheader dense>
            <v-list-item
                v-for="{ ingredient, measurement } in drink.components"
                :key="ingredient"
            >
                <v-list-item-content>
                    <v-list-item-title>
                        <span>{{ ingredient }}</span>
                        -
                        <span class="font-weight-thin">{{ measurement }}</span>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-subheader>Instructions</v-subheader>
        <p class="px-4">{{ drink.strInstructions }}</p>
    </v-card-base>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

// Models
import Drink from '@/models/Drink';

/**
 * The CardDrinkRecipe component
 * @public
 *
 * @class
 * @extends {Vue}
 */
@Component
export default class CardDrinkRecipe extends Vue {
    /**
     * The drink to populate the recipe with
     * @public
     *
     * @type {Drink}
     */
    @Prop({ default: null })
    public readonly drink!: Drink | null;
}
</script>
