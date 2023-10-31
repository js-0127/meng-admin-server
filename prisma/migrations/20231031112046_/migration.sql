/*
  Warnings:

  - A unique constraint covering the columns `[pkId]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pkId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `File` ADD COLUMN `pkId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `File_pkId_key` ON `File`(`pkId`);
