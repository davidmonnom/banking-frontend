/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Transaction } from '../models/Transaction';
import type { TransactionUpdate } from '../models/TransactionUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TransactionService {

    /**
     * List
     * @returns Transaction Successful Response
     * @throws ApiError
     */
    public static listTransactionListGet({
        dateStart = '',
        dateEnd = '',
    }: {
        dateStart?: string,
        dateEnd?: string,
    }): CancelablePromise<Array<Transaction>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/transaction/list',
            query: {
                'date_start': dateStart,
                'date_end': dateEnd,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Sync
     * @returns any Successful Response
     * @throws ApiError
     */
    public static syncTransactionSyncGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/transaction/sync',
            errors: {
                404: `Not found`,
            },
        });
    }

    /**
     * Update
     * @returns Transaction Successful Response
     * @throws ApiError
     */
    public static updateTransactionTransactionIdPut({
        transactionId,
        requestBody,
    }: {
        transactionId: number,
        requestBody: TransactionUpdate,
    }): CancelablePromise<Transaction> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/transaction/{transaction_id}',
            path: {
                'transaction_id': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

}