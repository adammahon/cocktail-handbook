import Category from '@/models/Category';
import BaseService from './Base';

/**
 * Service responsible for handling category related operations
 * @public
 *
 * @class
 * @extends {BaseService}
 */
export default class CategoryService extends BaseService {
    /**
     * Fetches all categories
     * @public
     *
     * @returns {[Category]} - All possible categories
     */
    public async fetchAll(): Promise<Category[]> {
        // Construct url for request
        const url = `${this.baseUrl}/list.php`;

        try {
            // Fetch categories from the api
            const { entities } = await this.api.get(url, {
                params: {
                    c: 'list'
                }
            });

            // Return an empty array if no categories are in the response
            if (!entities) {
                return [];
            }

            // Return the categories
            return entities.categories as Category[];
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}
