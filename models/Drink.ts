import { Model } from '@vuex-orm/core';
import { PrimaryKey, StringField, OrmModel } from 'vuex-orm-decorators';

// Service
import DrinkService from '@/services/Drink';

/**
 * The Drink model
 * @public
 *
 * @class
 * @extends {Base}
 */
@OrmModel('drinks')
export default class Drink extends Model {
    /* *************** */
    /* ** Constants ** */
    /* *************** */

    /**
     * Max number of components a drink can have
     * @private
     * @readonly
     * @constant
     * @type {number}
     */
    private readonly MAX_COMPONENT_COUNT = 15;

    /* ************************ */
    /* ** Service Definition ** */
    /* ************************ */

    /**
     * Service associated with this model
     * @public
     * @readonly
     * @type {DrinkService}
     */
    public static readonly Service = DrinkService;

    /* *********************** */
    /* ** Field Definitions ** */
    /* *********************** */

    @PrimaryKey()
    @StringField()
    public idDrink!: string;

    @StringField()
    public strDrink!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strTags!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strVideo!: string;

    @StringField()
    public strCategory!: string;

    @StringField()
    public strAlcoholic!: string;

    @StringField()
    public strGlass!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strIBA!: string;

    @StringField()
    public strInstructions!: string;

    @StringField()
    public strDrinkThumb!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strIngredient1!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strIngredient2!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strIngredient3!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strIngredient4!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strIngredient5!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strIngredient6!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strIngredient7!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strIngredient8!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strIngredient9!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strIngredient10!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strIngredient11!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strIngredient12!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strIngredient13!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strIngredient14!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strIngredient15!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strMeasure1!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strMeasure2!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strMeasure3!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strMeasure4!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strMeasure5!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strMeasure6!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strMeasure7!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strMeasure8!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strMeasure9!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strMeasure10!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strMeasure11!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strMeasure12!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strMeasure13!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strMeasure14!: string;

    @StringField(null, f => (f === 'null' ? '' : f))
    public strMeasure15!: string;

    /* ************* */
    /* ** Getters ** */
    /* ************* */

    /**
     * Gets the drink's tags
     * @public
     *
     * @returns {string[]} - The drink's tags
     */
    public get tags(): string[] {
        // Return an empty array if no tags are defined
        if (!this.strTags) {
            return [];
        }

        // Convert tag csv into array of strings
        return this.strTags.split(',');
    }

    /**
     * Gets the drink's ingredients
     * @public
     *
     * @returns {string[]} - The drink's ingredients
     */
    public get ingredients(): string[] {
        const ingredients = [];

        // Get all the ingredient fields and push them to an array
        for (let i = 1; i <= this.MAX_COMPONENT_COUNT; i += 1) {
            const ingredient = this[`strIngredient${i}` as 'strIngredient1'];

            if (ingredient) {
                ingredients.push(ingredient);
            }
        }

        // Return the array of ingredients
        return ingredients;
    }

    /**
     * Gets the drink's measurements
     * @public
     *
     * @returns {string[]} - The drink's measurements
     */
    public get measurements(): string[] {
        const measurements = [];

        // Get all the measurement fields and push them to an array
        for (let i = 1; i <= this.MAX_COMPONENT_COUNT; i += 1) {
            const measurement = this[`strMeasure${i}` as 'strMeasure1'];

            if (measurement) {
                measurements.push(measurement);
            }
        }

        // Return the array of measurements
        return measurements;
    }

    /**
     * Gets the drink's ingredients and measurements
     * @public
     *
     * @returns {object} - The drink's ingredients and measurements
     * @property {string} ingredient - The component's ingredient
     * @property {string} measurement - The component's ingredient measurement
     */
    public get components(): { ingredient: string; measurement: string }[] {
        const { ingredients, measurements } = this;

        // Join the ingredient and measurement data and return it
        return ingredients.map((ingredient, index) => ({
            measurement: measurements[index],
            ingredient
        }));
    }
}
