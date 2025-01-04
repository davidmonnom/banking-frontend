/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Budget } from '../models/Budget';
import type { BudgetCreate } from '../models/BudgetCreate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BudgetService {

    /**
     * List
     * @returns Budget Successful Response
     * @throws ApiError
     */
    public static listBudgetListGet(): CancelablePromise<Array<Budget>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/budget/list',
            errors: {
                404: `Not found`,
            },
        });
    }

    /**
     * Create
     * @returns Budget Successful Response
     * @throws ApiError
     */
    public static createBudgetPost({
        requestBody,
    }: {
        requestBody: BudgetCreate,
    }): CancelablePromise<Budget> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/budget/',
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
     * @returns Budget Successful Response
     * @throws ApiError
     */
    public static updateBudgetBudgetIdPut({
        budgetId,
        requestBody,
    }: {
        budgetId: number,
        requestBody: BudgetCreate,
    }): CancelablePromise<Budget> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/budget/{budget_id}',
            path: {
                'budget_id': budgetId,
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
    public static deleteBudgetBudgetIdDelete({
        budgetId,
    }: {
        budgetId: number,
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/budget/{budget_id}',
            path: {
                'budget_id': budgetId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

}