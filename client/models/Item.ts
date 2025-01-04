/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Account } from './Account';

export type Item = {
    itemId: string;
    accessToken: string;
    publicToken: string;
    groupId: number;
    institutionId?: (string | null);
    institutionName?: (string | null);
    webhook?: (string | null);
    updateDate?: (string | null);
    lastFailedUpdate?: (string | null);
    expirationDate?: (string | null);
    cursor?: (string | null);
    id: number;
    accounts: Array<Account>;
};
