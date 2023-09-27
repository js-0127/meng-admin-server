/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickName` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `avatar` VARCHAR(191) NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `nickName` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `sex` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_phoneNumber_key` ON `user`(`phoneNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `user_email_key` ON `user`(`email`);
