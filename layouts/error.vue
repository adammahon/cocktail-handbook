<template>
    <base-layout>
        <h1>{{ errorMessage }}</h1>
        <router-link to="/">Home page</router-link>
    </base-layout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import BaseLayout from '@/layouts/base.vue';

/**
 * The error layout
 * @public
 *
 * @class
 * @extends {Vue}
 */
@Component({
    components: {
        BaseLayout
    },
    /**
     * Method that sets various html metadata fields for the layout
     * @public
     *
     * @param {Error} this - The error layout instance
     *
     * @returns {void}
     */
    head(this: Error): object {
        return {
            title: this.errorMessage
        };
    }
})
export default class Error extends Vue {
    /**
     * The type of error that occured
     * @public
     *
     * @type {object} - The error that occured
     */
    @Prop({ default: null })
    public readonly error!: { statusCode: number } | null;

    /**
     * The error message to display
     * @public
     *
     * @returns {string} - The error message to display
     */
    public get errorMessage(): string {
        if (this.error && this.error.statusCode === 404) {
            return '404 Not Found';
        }

        return 'An error occurred';
    }
}
</script>
