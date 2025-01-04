/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Login
     * Redirect the user to the Google login page.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static loginAuthLoginGet({
        source,
    }: {
        source?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/login',
            query: {
                'source': source,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Logout
     * Forget the user's session.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static logoutAuthLogoutGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/logout',
            errors: {
                404: `Not found`,
            },
        });
    }

    /**
     * Login Callback
     * Process login and redirect the user to the protected endpoint.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static loginCallbackAuthCallbackGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/callback',
            errors: {
                404: `Not found`,
            },
        });
    }

}