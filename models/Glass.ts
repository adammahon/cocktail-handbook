import { Model } from '@vuex-orm/core';
import { PrimaryKey, StringField, OrmModel } from 'vuex-orm-decorators';

// Service
import GlassService from '@/services/Glass';

/**
 * The Glass model
 * @public
 *
 * @class
 * @extends {Base}
 */
@OrmModel('glasses')
export default class Glass extends Model {
    /* ************************ */
    /* ** Service Definition ** */
    /* ************************ */

    /**
     * Service associated with this model
     * @public
     * @readonly
     * @type {GlassService}
     */
    public static readonly Service = GlassService;

    /* *********************** */
    /* ** Field Definitions ** */
    /* *********************** */

    @PrimaryKey()
    @StringField()
    public strGlass!: string;
}
