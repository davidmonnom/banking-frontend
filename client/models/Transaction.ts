/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Budget } from './Budget';
import type { Category } from './Category';
import type { Goal } from './Goal';

export type Transaction = {
    transactionId: string;
    accountId: number;
    amount: number;
    name: string;
    merchantName?: (string | null);
    merchantWebsite?: (string | null);
    merchantEntityId?: (string | null);
    date: string;
    isoCurrencyCode: string;
    id: number;
    categories: Array<Category>;
    goals: Array<Goal>;
    budgets: Array<Budget>;
};
