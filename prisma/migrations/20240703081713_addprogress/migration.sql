/*
  Warnings:

  - You are about to drop the column `iconBgColor` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `Tasks` table. All the data in the column will be lost.
  - Added the required column `progress` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SubTasks" DROP CONSTRAINT "SubTasks_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_userId_fkey";

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "iconBgColor",
DROP COLUMN "isCompleted",
ADD COLUMN     "progress" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTasks" ADD CONSTRAINT "SubTasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Tasks"("tasksId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Tasks"("tasksId") ON DELETE CASCADE ON UPDATE CASCADE;
