import Glass from '@/models/Glass';
import BaseService from './Base';

/**
 * Service responsible for handling glass related operations
 * @public
 *
 * @class
 * @extends {BaseService}
 */
export default class GlassService extends BaseService {
    /**
     * Fetches all glasses
     * @public
     *
     * @returns {[Glass]} - All possible glasses
     */
    public async fetchAll(): Promise<Glass[]> {
        // Construct url for request
        const url = `${this.baseUrl}/list.php`;

        try {
            // Fetch glasses from the api
            const { entities } = await this.api.get(url, {
                params: {
                    g: 'list'
                }
            });

            // Return an empty array if no glasses are in the response
            if (!entities) {
                return [];
            }

            // Return the glasses
            return entities.glasses as Glass[];
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}
