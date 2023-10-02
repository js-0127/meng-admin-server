-- DropForeignKey
ALTER TABLE `File` DROP FOREIGN KEY `File_userId_fkey`;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
