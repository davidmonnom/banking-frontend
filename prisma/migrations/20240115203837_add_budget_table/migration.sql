/*
  Warnings:

  - You are about to drop the column `budget` on the `UserBudget` table. All the data in the column will be lost.
  - Added the required column `amount` to the `UserBudget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserBudget" DROP COLUMN "budget",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;
