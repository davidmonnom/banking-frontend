/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Goal } from '../models/Goal';
import type { GoalCreate } from '../models/GoalCreate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GoalService {

    /**
     * List
     * @returns Goal Successful Response
     * @throws ApiError
     */
    public static listGoalListGet(): CancelablePromise<Array<Goal>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/goal/list',
            errors: {
                404: `Not found`,
            },
        });
    }

    /**
     * Create
     * @returns Goal Successful Response
     * @throws ApiError
     */
    public static createGoalPost({
        requestBody,
    }: {
        requestBody: GoalCreate,
    }): CancelablePromise<Goal> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/goal/',
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
     * @returns Goal Successful Response
     * @throws ApiError
     */
    public static updateGoalGoalIdPut({
        goalId,
        requestBody,
    }: {
        goalId: number,
        requestBody: GoalCreate,
    }): CancelablePromise<Goal> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/goal/{goal_id}',
            path: {
                'goal_id': goalId,
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
    public static deleteGoalGoalIdDelete({
        goalId,
    }: {
        goalId: number,
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/goal/{goal_id}',
            path: {
                'goal_id': goalId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

}