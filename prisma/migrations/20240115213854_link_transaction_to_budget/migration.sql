-- CreateTable
CREATE TABLE "BankTransactionBudget" (
    "budgetId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,

    CONSTRAINT "BankTransactionBudget_pkey" PRIMARY KEY ("budgetId","transactionId")
);

-- AddForeignKey
ALTER TABLE "BankTransactionBudget" ADD CONSTRAINT "BankTransactionBudget_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "UserBudget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankTransactionBudget" ADD CONSTRAINT "BankTransactionBudget_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "BankTransaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
