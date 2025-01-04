/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserCreate = {
    externalId: string;
    isAdmin?: boolean;
    email: string;
    first_name: string;
    last_name: string;
    picture: string;
    provider: string;
    language: string;
    darkMode: boolean;
};
