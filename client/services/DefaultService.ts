/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Protected Endpoint
     * This endpoint will say hello to the logged user.
     * If the user is not logged, it will return a 401 error from `get_logged_user`.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static protectedEndpointGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }

}