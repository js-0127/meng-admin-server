/*
  Warnings:

  - The primary key for the `Menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Role_Menu` DROP FOREIGN KEY `Role_Menu_menuId_fkey`;

-- DropForeignKey
ALTER TABLE `Role_Menu` DROP FOREIGN KEY `Role_Menu_roleId_fkey`;

-- AlterTable
ALTER TABLE `Menu` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Role` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Role_Menu` MODIFY `roleId` VARCHAR(191) NOT NULL,
    MODIFY `menuId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Role_Menu` ADD CONSTRAINT `Role_Menu_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Role_Menu` ADD CONSTRAINT `Role_Menu_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
