/*
  Warnings:

  - Added the required column `icon` to the `Tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconBgColor` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tasks_userId_key";

-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "iconBgColor" TEXT NOT NULL;
