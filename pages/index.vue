<template>
    <v-row>
        <v-col cols="12">
            <h1>Hello World</h1>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
    head(this: Page): object {
        return {
            title: 'Home'
        };
    }
})
export default class Page extends Vue {}
</script>
