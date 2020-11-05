import { Model as BaseModel } from '@vuex-orm/core';
import BaseService from '@/services/Base';
import { LooseObject } from '@/types';

export default {
    /**
     * Installs the plugin in the VuexORM pipeline
     * @public
     *
     * @param {object} components - All possible components a VuexORM plugin can hook into
     *
     * @returns {void}
     */
    install({ Model }: { Model: typeof BaseModel }) {
        // Attach function for initiating a new service method
        Model.service = function <T extends BaseService>(
            options: LooseObject | undefined = {}
        ): T {
            const opts = { ...options };
            const { Service, api, store } = this;
            const resolvedStore = store.call(this);
            const boundApi = api.call(this);

            // Configure the api
            // NOTE: this is hardcoded because most, if not all, api responses append the results to a 'drinks' object key
            boundApi.config.dataKey = 'drinks';

            // Configure the api with values from the options
            if (opts && Object.prototype.hasOwnProperty.call(opts, 'request')) {
                // Merge the passed request options into the request config
                boundApi.config = {
                    ...boundApi.config,
                    ...opts.request
                };

                // Remove the passed request options
                delete opts.request;
            }

            // Create a new service instance
            return new Service({
                ...opts,
                store: resolvedStore,
                api: boundApi,
                baseUrl: '',
                model: this
            });
        };
    }
};
