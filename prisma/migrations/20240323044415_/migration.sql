/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Media` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Privileges` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `create` JSON NULL,
    `read` JSON NULL,
    `update` JSON NULL,
    `delete` JSON NULL,
    `rolesId` INTEGER NULL,

    UNIQUE INDEX `Privileges_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Media_url_key` ON `Media`(`url`);

-- AddForeignKey
ALTER TABLE `Privileges` ADD CONSTRAINT `Privileges_rolesId_fkey` FOREIGN KEY (`rolesId`) REFERENCES `Roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
