<template>
    <base-layout>
        <h1>{{ errorMessage }}</h1>
        <router-link to="/">Home page</router-link>
    </base-layout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import BaseLayout from '@/layouts/base.vue';

@Component({
    components: {
        BaseLayout
    },
    head(this: Layout): object {
        return {
            title: this.errorMessage
        };
    }
})
export default class Layout extends Vue {
    @Prop({ default: null })
    readonly error!: { statusCode: number } | null;

    get errorMessage() {
        if (this.error && this.error.statusCode === 404) {
            return '404 Not Found';
        }

        return 'An error occurred';
    }

    head() {
        return {
            title: this.errorMessage
        };
    }
}
</script>
