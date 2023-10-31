/*
  Warnings:

  - You are about to drop the column `pkId` on the `File` table. All the data in the column will be lost.
  - Added the required column `userId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `File_pkId_key` ON `File`;

-- AlterTable
ALTER TABLE `File` DROP COLUMN `pkId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
