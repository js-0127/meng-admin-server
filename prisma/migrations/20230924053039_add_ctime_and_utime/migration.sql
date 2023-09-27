/*
  Warnings:

  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userName]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updateAt` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `user_username_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `username`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_userName_key` ON `user`(`userName`);
