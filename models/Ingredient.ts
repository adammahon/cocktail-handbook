import { Model } from '@vuex-orm/core';
import { PrimaryKey, StringField, OrmModel } from 'vuex-orm-decorators';

// Service
import IngredientService from '@/services/Ingredient';

/**
 * The Ingredient model
 * @public
 *
 * @class
 * @extends {Base}
 */
@OrmModel('ingredients')
export default class Ingredient extends Model {
    /* ************************ */
    /* ** Service Definition ** */
    /* ************************ */

    /**
     * Service associated with this model
     * @public
     * @readonly
     * @type {IngredientService}
     */
    public static readonly Service = IngredientService;

    /* *********************** */
    /* ** Field Definitions ** */
    /* *********************** */

    @PrimaryKey()
    @StringField()
    public strIngredient1!: string;
}
