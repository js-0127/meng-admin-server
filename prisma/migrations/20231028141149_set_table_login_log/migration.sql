-- CreateTable
CREATE TABLE `Login_Log` (
    `id` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NULL,
    `ip` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `browser` VARCHAR(191) NULL,
    `os` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
