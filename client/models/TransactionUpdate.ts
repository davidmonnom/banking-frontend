/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransactionUpdate = {
    name: string;
    merchantName?: (string | null);
    merchantWebsite?: (string | null);
    merchantEntityId?: (string | null);
    categories?: (Array<number> | null);
    goals?: (Array<number> | null);
    budgets?: (Array<number> | null);
};
