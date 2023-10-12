/*
  Warnings:

  - Made the column `type` on table `Menu` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Menu` MODIFY `type` INTEGER NOT NULL;
