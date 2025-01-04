/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';
import type { UserCreate } from '../models/UserCreate';
import type { UserUpdate } from '../models/UserUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * Get
     * Fetch the user's data.
     * @returns User Successful Response
     * @throws ApiError
     */
    public static getUserGet(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/',
            errors: {
                404: `Not found`,
            },
        });
    }

    /**
     * Create
     * @returns User Successful Response
     * @throws ApiError
     */
    public static createUserPost({
        requestBody,
    }: {
        requestBody: UserCreate,
    }): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update
     * Update the user's preference.
     * @returns User Successful Response
     * @throws ApiError
     */
    public static updateUserUserIdPut({
        userId,
        requestBody,
    }: {
        userId: number,
        requestBody: UserUpdate,
    }): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/{user_id}',
            path: {
                'user_id': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Add Shared User
     * Add a user to the shared group.
     * @returns User Successful Response
     * @throws ApiError
     */
    public static addSharedUserUserSharedPost({
        email,
    }: {
        email: string,
    }): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/shared/',
            query: {
                'email': email,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Remove Shared User
     * Remove a user from the shared group.
     * @returns number Successful Response
     * @throws ApiError
     */
    public static removeSharedUserUserSharedUserIdDelete({
        userId,
    }: {
        userId: number,
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/shared/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

}