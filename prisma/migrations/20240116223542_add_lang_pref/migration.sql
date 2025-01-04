/*
  Warnings:

  - Added the required column `language` to the `UserPreference` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserPreference" ADD COLUMN     "language" TEXT NOT NULL;
