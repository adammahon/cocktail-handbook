<template>
    <base-layout>
        <v-container>
            <nuxt />
        </v-container>
    </base-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import BaseLayout from '@/layouts/base.vue';

/**
 * The default layout
 * @public
 *
 * @class
 * @extends {Vue}
 */
@Component({
    components: {
        BaseLayout
    }
})
export default class Default extends Vue {}
</script>
