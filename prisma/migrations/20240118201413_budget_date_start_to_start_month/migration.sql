/*
  Warnings:

  - You are about to drop the column `dateStart` on the `UserBudget` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserBudget" DROP COLUMN "dateStart",
ADD COLUMN     "startMonth" DOUBLE PRECISION;
