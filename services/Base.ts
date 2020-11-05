import { Request } from '@vuex-orm/plugin-axios';

/**
 * Base service responsible for handling operations that are universal to all models
 * @public
 *
 * @class
 */
export default class BaseService {
    /* **************** */
    /* ** Properties ** */
    /* **************** */

    /**
     * The Axios API instance
     * @protected
     * @type {Request}
     */
    protected api: Request;

    /**
     * The API's base url
     * @protected
     * @type {string}
     */
    protected baseUrl: string;

    /**
     * The mode this service is associated with
     * @protected
     * @type {object}
     */
    protected model: object;

    /**
     * The Vuex store
     * @protected
     * @type {object}
     */
    protected store: object;

    /* ****************** */
    /* ** Constructors ** */
    /* ****************** */

    /**
     * Creates a service instance
     * @public
     *
     * @param {object} props - The parameters provided to the service
     * @property {Request} api - The VuexORM Axios api method
     * @property {string} baseUrl - The base url for all api requests made from this service
     * @property {object} model - The model this service is for
     * @property {object} store - The Vuex store
     *
     * @returns {BaseService} - Returns a new instance of this service
     */
    public constructor({
        api,
        baseUrl,
        model,
        store
    }: {
        api: Request;
        baseUrl: string;
        model: object;
        store: object;
    }) {
        this.api = api;
        this.baseUrl = baseUrl;
        this.model = model;
        this.store = store;
    }
}
