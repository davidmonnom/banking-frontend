/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DataService {

    /**
     * Init
     * Fetch initial data for the user.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static initDataInitGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/init',
            errors: {
                404: `Not found`,
            },
        });
    }

    /**
     * Link Token
     * Fetch a new link token for the user.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static linkTokenDataLinkGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/link',
            errors: {
                404: `Not found`,
            },
        });
    }

}