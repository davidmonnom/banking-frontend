/*
  Warnings:

  - Made the column `startMonth` on table `UserBudget` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserBudget" ALTER COLUMN "startMonth" SET NOT NULL;
