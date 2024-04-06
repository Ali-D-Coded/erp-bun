/*
  Warnings:

  - A unique constraint covering the columns `[productCode]` on the table `ProductStocks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[barCode]` on the table `ProductStocks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `barCode` to the `ProductStocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productCode` to the `ProductStocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `ProductStocks` table without a default value. This is not possible if the table is not empty.
  - Made the column `productId` on table `ProductStocks` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `ProductStocks` DROP FOREIGN KEY `ProductStocks_productId_fkey`;

-- AlterTable
ALTER TABLE `ProductStocks` ADD COLUMN `barCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `productCode` INTEGER NOT NULL,
    ADD COLUMN `productName` VARCHAR(191) NOT NULL,
    MODIFY `productId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `PurchaseReturns` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `purchaseBillNo` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `totalAmount` DECIMAL(65, 30) NOT NULL,
    `vendorsId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurchaseReturnItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `batchNumber` VARCHAR(191) NOT NULL,
    `purchasePrice` DECIMAL(65, 30) NOT NULL,
    `minimumSellingPrice` DECIMAL(65, 30) NOT NULL,
    `maximumRetailPrice` DECIMAL(65, 30) NOT NULL,
    `commissionPercentage` DECIMAL(65, 30) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `purchaseReturnsId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ProductStocks_productCode_key` ON `ProductStocks`(`productCode`);

-- CreateIndex
CREATE UNIQUE INDEX `ProductStocks_barCode_key` ON `ProductStocks`(`barCode`);

-- AddForeignKey
ALTER TABLE `PurchaseReturns` ADD CONSTRAINT `PurchaseReturns_vendorsId_fkey` FOREIGN KEY (`vendorsId`) REFERENCES `Vendors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseReturnItem` ADD CONSTRAINT `PurchaseReturnItem_purchaseReturnsId_fkey` FOREIGN KEY (`purchaseReturnsId`) REFERENCES `PurchaseReturns`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
