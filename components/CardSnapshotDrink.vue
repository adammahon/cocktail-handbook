<template>
    <v-card-base :title="title" classes="drink">
        <template v-slot:top>
            <v-card-title class="drink-thumbnail">
                <div class="drink-circle">
                    <v-img :src="drink.strDrinkThumb" :alt="drink.name" />
                </div>
            </v-card-title>
            <v-card-text class="drink-info">
                <div class="drink-name">
                    {{ drink.strDrink }}
                </div>
                <div class="drink-stats">
                    <div v-for="stat in stats" :key="stat.label">
                        <div class="drink-stat">
                            <span>{{ stat.label }}</span>
                            <span>{{ stat.value }}</span>
                        </div>
                    </div>
                </div>
                <div class="drink-tags">
                    <span>Tags:</span>
                    <v-chip
                        v-for="tag in drink.tags"
                        :key="tag"
                        class="ma-2"
                        color="pink darken-4"
                        text-color="white"
                    >
                        {{ tag }}
                    </v-chip>
                </div>
            </v-card-text>
        </template>
    </v-card-base>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

// Models
import Drink from '@/models/Drink';

/**
 * The CardSnapshotDrink component
 * @public
 *
 * @class
 * @extends {Vue}
 */
@Component
export default class CardSnapshotDrink extends Vue {
    /**
     * The title to display over the snapshot
     * @public
     *
     * @type {string}
     */
    @Prop({ default: undefined })
    public readonly title!: string;

    /**
     * The drink to populate the snapshot with
     * @public
     *
     * @type {Drink}
     */
    @Prop({ default: null })
    public readonly drink!: Drink | null;

    /**
     * The stats to display on the snapshot
     * @public
     *
     * @type {object[]}
     */
    public get stats(): { label: string; value: string | undefined }[] {
        return [
            {
                label: 'Category',
                value: this.drink?.strCategory
            },
            {
                label: 'IBA',
                value: this.drink?.strIBA
            },
            {
                label: 'Glass',
                value: this.drink?.strGlass
            }
        ];
    }
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';

.drink {
    width: 100%;

    .drink-thumbnail {
        height: 8rem;
        background: linear-gradient(
            -45deg,
            map-get($pink, base),
            map-get($pink, darken-4)
        );
        position: relative;

        .drink-circle {
            position: absolute;
            width: 8rem;
            height: 8rem;
            border: 5px solid #fff;
            border-radius: 50%;
            left: 0;
            right: 0;
            bottom: -2rem;
            margin: auto;
            text-align: center;
            font-weight: 300;
            color: #fff;
            overflow: hidden;
        }
    }

    .drink-info {
        padding-top: 4rem;
        text-align: center;

        .drink-name {
            font-size: 2rem;
            font-weight: 100;
            color: rgba(0, 0, 0, 0.87);
        }

        .drink-stats {
            padding: 1rem 0;
            margin: 1em 0;
            border-top: 1px solid rgba(0, 0, 0, 0.6);
            border-bottom: 1px solid rgba(0, 0, 0, 0.6);
        }

        .drink-stat {
            text-align: left;
            word-wrap: break-word;
        }

        .drink-stat span:first-of-type {
            font-size: 0.8rem;
            text-transform: uppercase;
            line-height: 1;
            margin-top: 0.5rem;
            display: block;
        }

        .drink-stat span:last-of-type {
            font-size: 1.5rem;
            font-weight: bold;
            display: block;
            min-height: 22px;
        }

        .drink-tags span:first-of-type {
            font-size: 0.8rem;
            text-align: left;
            text-transform: uppercase;
            line-height: 1;
            margin-top: 0.5rem;
            display: block;
        }
    }
}
</style>
