/*
  Warnings:

  - Changed the type of `dateEnd` on the `UserGoal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UserGoal" DROP COLUMN "dateEnd",
ADD COLUMN     "dateEnd" TIMESTAMP(3) NOT NULL;
