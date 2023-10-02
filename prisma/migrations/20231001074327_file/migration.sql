/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `file` (
    `pkValue` VARCHAR(191) NOT NULL,
    `pkNmae` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(191) NULL,
    `lePath` VARCHAR(191) NULL,

    UNIQUE INDEX `file_fileName_key`(`fileName`),
    UNIQUE INDEX `file_lePath_key`(`lePath`),
    PRIMARY KEY (`pkValue`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `user_id_key` ON `user`(`id`);
