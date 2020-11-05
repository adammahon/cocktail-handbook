<template>
    <v-card :class="classes" elevation="12">
        <div v-if="!!title">
            <v-toolbar flat>
                <v-toolbar-title class="text-uppercase">
                    {{ title }}
                </v-toolbar-title>
                <slot name="toolbar" />
            </v-toolbar>
            <v-divider />
        </div>
        <slot name="top" />
        <v-card-text>
            <slot />
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

/**
 * The VCardBase component
 * @public
 *
 * @class
 * @extends {Vue}
 */
@Component
export default class VCardBase extends Vue {
    /**
     * The title to display in the card
     * @public
     *
     * @type {string}
     */
    @Prop({ default: null })
    public readonly title!: string | null;

    /**
     * The class to add to the card
     * @public
     *
     * @type {string}
     */
    @Prop({ default: undefined })
    public readonly classes!: string | undefined;
}
</script>
