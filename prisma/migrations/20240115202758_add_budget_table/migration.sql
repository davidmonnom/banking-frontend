-- CreateTable
CREATE TABLE "UserBudget" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "UserBudget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserBudget_groupId_idx" ON "UserBudget"("groupId");

-- AddForeignKey
ALTER TABLE "UserBudget" ADD CONSTRAINT "UserBudget_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
