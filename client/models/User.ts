/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Group } from './Group';

export type User = {
    externalId: string;
    isAdmin?: boolean;
    email: string;
    first_name: string;
    last_name: string;
    picture: string;
    provider: string;
    language: string;
    darkMode: boolean;
    id: number;
    groups?: (Array<Group> | null);
    ownedGroup?: (Array<Group> | null);
};
