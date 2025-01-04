/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Category } from '../models/Category';
import type { CategoryCreate } from '../models/CategoryCreate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CategoryService {

    /**
     * List
     * @returns Category Successful Response
     * @throws ApiError
     */
    public static listCategoryListGet(): CancelablePromise<Array<Category>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/category/list',
            errors: {
                404: `Not found`,
            },
        });
    }

    /**
     * Create
     * @returns Category Successful Response
     * @throws ApiError
     */
    public static createCategoryPost({
        requestBody,
    }: {
        requestBody: CategoryCreate,
    }): CancelablePromise<Category> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/category/',
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
     * @returns Category Successful Response
     * @throws ApiError
     */
    public static updateCategoryCategoryIdPut({
        categoryId,
        requestBody,
    }: {
        categoryId: number,
        requestBody: CategoryCreate,
    }): CancelablePromise<Category> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/category/{category_id}',
            path: {
                'category_id': categoryId,
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
     * Delete
     * @returns number Successful Response
     * @throws ApiError
     */
    public static deleteCategoryCategoryIdDelete({
        categoryId,
    }: {
        categoryId: number,
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/category/{category_id}',
            path: {
                'category_id': categoryId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

}