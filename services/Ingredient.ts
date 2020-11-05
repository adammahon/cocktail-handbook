import Ingredient from '@/models/Ingredient';
import BaseService from './Base';

/**
 * Service responsible for handling ingredient related operations
 * @public
 *
 * @class
 * @extends {BaseService}
 */
export default class IngredientService extends BaseService {
    /**
     * Fetches all ingredients
     * @public
     *
     * @returns {[Ingredient]} - All possible ingredients
     */
    public async fetchAll(): Promise<Ingredient[]> {
        // Construct url for request
        const url = `${this.baseUrl}/list.php`;

        try {
            // Fetch ingredients from the api
            const { entities } = await this.api.get(url, {
                params: {
                    i: 'list'
                }
            });

            // Return an empty array if no ingredients are in the response
            if (!entities) {
                return [];
            }

            // Return the ingredients
            return entities.ingredients as Ingredient[];
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}
