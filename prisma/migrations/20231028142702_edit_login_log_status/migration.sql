/*
  Warnings:

  - You are about to alter the column `status` on the `Login_Log` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Login_Log` MODIFY `status` BOOLEAN NULL;
