/*
  Warnings:

  - You are about to drop the column `description` on the `ProductsVariant` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ProductsVariant` table. All the data in the column will be lost.
  - You are about to drop the column `unitsId` on the `PurchaseItem` table. All the data in the column will be lost.
  - Added the required column `VAT` to the `ProductsVariant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `ProductsVariant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantName` to the `ProductsVariant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantValue` to the `ProductsVariant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `PurchaseItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `PurchaseItem` DROP FOREIGN KEY `PurchaseItem_unitsId_fkey`;

-- DropIndex
DROP INDEX `ProductsVariant_name_idx` ON `ProductsVariant`;

-- DropIndex
DROP INDEX `ProductsVariant_name_key` ON `ProductsVariant`;

-- AlterTable
ALTER TABLE `ProductStocks` ADD COLUMN `quantityAlert` INTEGER NOT NULL DEFAULT 5;

-- AlterTable
ALTER TABLE `Products` ADD COLUMN `brandId` VARCHAR(191) NULL,
    ADD COLUMN `description` JSON NULL,
    ADD COLUMN `slug` VARCHAR(191) NULL,
    ADD COLUMN `unitsId` INTEGER NULL;

-- AlterTable
ALTER TABLE `ProductsVariant` DROP COLUMN `description`,
    DROP COLUMN `name`,
    ADD COLUMN `VAT` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `customFields` JSON NULL,
    ADD COLUMN `discountType` ENUM('FLAT', 'PERCENT') NOT NULL DEFAULT 'PERCENT',
    ADD COLUMN `discountValue` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    ADD COLUMN `price` DECIMAL(65, 30) NULL,
    ADD COLUMN `sku` VARCHAR(191) NOT NULL,
    ADD COLUMN `variantName` VARCHAR(191) NOT NULL,
    ADD COLUMN `variantValue` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `PurchaseItem` DROP COLUMN `unitsId`,
    ADD COLUMN `unit` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Stores` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `storeName` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Stores_id_key`(`id`),
    UNIQUE INDEX `Stores_userName_key`(`userName`),
    UNIQUE INDEX `Stores_phone_key`(`phone`),
    UNIQUE INDEX `Stores_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WareHouse` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `name` VARCHAR(191) NOT NULL,
    `contactPerson` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `WareHouse_id_key`(`id`),
    UNIQUE INDEX `WareHouse_phone_key`(`phone`),
    UNIQUE INDEX `WareHouse_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `address` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `zipcode` VARCHAR(191) NOT NULL,
    `wareHouseId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Location_id_key`(`id`),
    UNIQUE INDEX `Location_wareHouseId_key`(`wareHouseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Brand` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `name` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Brand_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `ProductsVariant_id_productCode_barCode_idx` ON `ProductsVariant`(`id`, `productCode`, `barCode`);

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_wareHouseId_fkey` FOREIGN KEY (`wareHouseId`) REFERENCES `WareHouse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_unitsId_fkey` FOREIGN KEY (`unitsId`) REFERENCES `Units`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
