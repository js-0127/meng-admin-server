/*
  Warnings:

  - You are about to drop the column `lePath` on the `file` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[filePath]` on the table `file` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `file_lePath_key` ON `file`;

-- AlterTable
ALTER TABLE `file` DROP COLUMN `lePath`,
    ADD COLUMN `filePath` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `file_filePath_key` ON `file`(`filePath`);
