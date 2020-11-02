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

@Component({
    components: {
        BaseLayout
    }
})
export default class Layout extends Vue {}
</script>
