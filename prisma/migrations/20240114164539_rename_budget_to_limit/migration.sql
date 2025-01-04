/*
  Warnings:

  - You are about to drop the column `budget` on the `UserCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserCategory" DROP COLUMN "budget",
ADD COLUMN     "limit" DOUBLE PRECISION NOT NULL DEFAULT 0;
