import Drink from '@/models/Drink';
import BaseService from './Base';

/**
 * Service responsible for handling drink related operations
 * @public
 *
 * @class
 * @extends {BaseService}
 */
export default class DrinkService extends BaseService {
    /**
     * Fetches all drinks matching or similar to the provided drink name
     * @public
     *
     * @param {string} name - The name of the drink to search for
     *
     * @returns {[Drink]} - All drinks matching or having similar names to the provided name
     */
    public async fetchManyByName(name: string): Promise<Drink[]> {
        // Construct url for request
        const url = `${this.baseUrl}/search.php`;

        try {
            // Fetch drinks from the api
            const { entities } = await this.api.get(url, {
                params: {
                    s: name
                }
            });

            // Return an empty array if no drinks are in the response
            if (!entities) {
                return [];
            }

            // Return the drinks
            return entities.drinks as Drink[];
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    /**
     * Fetches all drinks associated with the provided ingredient
     * @public
     *
     * @param {string} ingredient - The ingredient to fetch drinks for
     *
     * @returns {[Drink]} - All drinks associated with the provided ingredient
     */
    public async fetchManyByIngredient(ingredient: string): Promise<Drink[]> {
        // Construct url for request
        const url = `${this.baseUrl}/filter.php`;

        try {
            // Fetch drinks from the api
            const { entities } = await this.api.get(url, {
                params: {
                    i: ingredient
                }
            });

            // Return an empty array if no drinks are in the response
            if (!entities) {
                return [];
            }

            // Return the drinks
            return entities.drinks as Drink[];
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    /**
     * Fetches all drinks depending upon if they contain alcohol or not
     * @public
     *
     * @param {boolean} alcoholic - Flag indicating if the drinks should contain alcohol or not
     *
     * @returns {[Drink]} - All drinks associated with the provided alcohol flag
     */
    public async fetchManyByAlcoholic(alcoholic: boolean): Promise<Drink[]> {
        // Construct url for request
        const url = `${this.baseUrl}/filter.php`;

        try {
            // Fetch drinks from the api
            const { entities } = await this.api.get(url, {
                params: {
                    a: alcoholic ? 'Alcoholic' : 'Non_Alcoholic'
                }
            });

            // Return an empty array if no drinks are in the response
            if (!entities) {
                return [];
            }

            // Return the drinks
            return entities.drinks as Drink[];
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    /**
     * Fetches all drinks associated with the provided type of glass
     * @public
     *
     * @param {string} glass - The type of glass to fetch drinks for
     *
     * @returns {[Drink]} - All drinks associated with the provided glass
     */
    public async fetchManyByGlass(glass: string): Promise<Drink[]> {
        // Construct url for request
        const url = `${this.baseUrl}/filter.php`;

        try {
            // Fetch drinks from the api
            const { entities } = await this.api.get(url, {
                params: {
                    g: glass
                }
            });

            // Return an empty array if no drinks are in the response
            if (!entities) {
                return [];
            }

            // Return the drinks
            return entities.drinks as Drink[];
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    /**
     * Fetches all drinks associated with the provided category
     * @public
     *
     * @param {string} category - The category of drinks to fetch
     *
     * @returns {[Drink]} - All drinks associated with the provided category
     */
    public async fetchManyByCategory(category: string): Promise<Drink[]> {
        // Construct url for request
        const url = `${this.baseUrl}/filter.php`;

        try {
            // Fetch drinks from the api
            const { entities } = await this.api.get(url, {
                params: {
                    c: category
                }
            });

            // Return an empty array if no drinks are in the response
            if (!entities) {
                return [];
            }

            // Return the drinks
            return entities.drinks as Drink[];
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    /**
     * Fetches a drink associated with the provided id
     * @public
     *
     * @param {string} id - The id of the drink to fetch
     *
     * @returns {Drink} - The drink with the provided id
     */
    public async fetchOneById(id: string): Promise<Drink | null> {
        // Construct url for request
        const url = `${this.baseUrl}/lookup.php`;

        try {
            // Fetch drink from the api
            const { entities } = await this.api.get(url, {
                params: {
                    i: id
                }
            });

            // Return null if no drinks are in the response
            if (!entities) {
                return null;
            }

            // Return the drink
            return entities.drinks[0] as Drink;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    /**
     * Fetches a random drink
     * @public
     *
     * @returns {Drink} - A random drink
     */
    public async fetchOneRandomly(): Promise<Drink | null> {
        // Construct url for request
        const url = `${this.baseUrl}/random.php`;

        try {
            // Fetch drink from the api
            const { entities } = await this.api.get(url);

            // Return null if no drinks are in the response
            if (!entities) {
                return null;
            }

            // Return the drink
            return entities.drinks[0] as Drink;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}
