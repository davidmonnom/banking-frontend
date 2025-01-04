/*
  Warnings:

  - You are about to drop the column `type` on the `UserGoal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserGoal" DROP COLUMN "type";

-- CreateTable
CREATE TABLE "BankTransactionGoal" (
    "goalId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,

    CONSTRAINT "BankTransactionGoal_pkey" PRIMARY KEY ("goalId","transactionId")
);

-- AddForeignKey
ALTER TABLE "BankTransactionGoal" ADD CONSTRAINT "BankTransactionGoal_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "UserGoal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankTransactionGoal" ADD CONSTRAINT "BankTransactionGoal_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "BankTransaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
