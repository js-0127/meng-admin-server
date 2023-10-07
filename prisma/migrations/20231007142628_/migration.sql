/*
  Warnings:

  - The primary key for the `File` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pkName` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `pkValue` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fileName]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[filePath]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `File` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Made the column `fileName` on table `File` required. This step will fail if there are existing NULL values in that column.
  - Made the column `filePath` on table `File` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `File` DROP FOREIGN KEY `File_userId_fkey`;

-- AlterTable
ALTER TABLE `File` DROP PRIMARY KEY,
    DROP COLUMN `pkName`,
    DROP COLUMN `pkValue`,
    DROP COLUMN `userId`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    MODIFY `fileName` VARCHAR(191) NOT NULL,
    MODIFY `filePath` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `File_fileName_key` ON `File`(`fileName`);

-- CreateIndex
CREATE UNIQUE INDEX `File_filePath_key` ON `File`(`filePath`);
