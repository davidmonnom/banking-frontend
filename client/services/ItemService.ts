/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Item } from '../models/Item';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ItemService {

    /**
     * List
     * @returns Item Successful Response
     * @throws ApiError
     */
    public static listItemListGet(): CancelablePromise<Array<Item>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/item/list',
            errors: {
                404: `Not found`,
            },
        });
    }

    /**
     * Create
     * Create a new item.
     * @returns Item Successful Response
     * @throws ApiError
     */
    public static createItemPost({
        publicToken,
    }: {
        publicToken: string,
    }): CancelablePromise<Item> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/item/',
            query: {
                'public_token': publicToken,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

}