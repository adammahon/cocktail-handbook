<template>
    <v-app :style="{ background: 'repeat url(/background.png)' }">
        <the-navigation />
        <v-main>
            <slot />
        </v-main>
    </v-app>
</template>
