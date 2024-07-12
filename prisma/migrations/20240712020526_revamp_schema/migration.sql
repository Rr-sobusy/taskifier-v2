/*
  Warnings:

  - Made the column `isCompleted` on table `SubTasks` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userEmail` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_userId_fkey";

-- AlterTable
ALTER TABLE "SubTasks" ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "isCompleted" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;
