import { Model } from '@vuex-orm/core';
import { PrimaryKey, StringField, OrmModel } from 'vuex-orm-decorators';

// Service
import CategoryService from '@/services/Category';

/**
 * The Category model
 * @public
 *
 * @class
 * @extends {Base}
 */
@OrmModel('categories')
export default class Category extends Model {
    /* ************************ */
    /* ** Service Definition ** */
    /* ************************ */

    /**
     * Service associated with this model
     * @public
     * @readonly
     * @type {CategoryService}
     */
    public static readonly Service = CategoryService;

    /* *********************** */
    /* ** Field Definitions ** */
    /* *********************** */

    @PrimaryKey()
    @StringField()
    public strCategory!: string;
}
