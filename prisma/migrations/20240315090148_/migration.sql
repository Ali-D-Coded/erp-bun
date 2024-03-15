/*
  Warnings:

  - You are about to drop the column `productsVariantId` on the `ProductStocks` table. All the data in the column will be lost.
  - You are about to drop the column `productVariantId` on the `SalesProducts` table. All the data in the column will be lost.
  - You are about to drop the column `productsVariantId` on the `VariantCombinations` table. All the data in the column will be lost.
  - You are about to drop the `ProductsVariant` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[productId]` on the table `ProductStocks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productCode]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[barCode]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `VAT` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barCode` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productCode` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `SalesProducts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Media` DROP FOREIGN KEY `Media_productsVariantId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductStocks` DROP FOREIGN KEY `ProductStocks_productsVariantId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductsVariant` DROP FOREIGN KEY `ProductsVariant_productsId_fkey`;

-- DropForeignKey
ALTER TABLE `VariantCombinations` DROP FOREIGN KEY `VariantCombinations_productsVariantId_fkey`;

-- DropIndex
DROP INDEX `Products_name_idx` ON `Products`;

-- AlterTable
ALTER TABLE `Media` ADD COLUMN `productsId` INTEGER NULL;

-- AlterTable
ALTER TABLE `ProductStocks` DROP COLUMN `productsVariantId`,
    ADD COLUMN `productId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Products` ADD COLUMN `VAT` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `barCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `customFields` JSON NULL,
    ADD COLUMN `discountType` ENUM('FLAT', 'PERCENT') NOT NULL DEFAULT 'PERCENT',
    ADD COLUMN `discountValue` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    ADD COLUMN `price` DECIMAL(65, 30) NULL,
    ADD COLUMN `productCode` INTEGER NOT NULL,
    ADD COLUMN `quantity` INTEGER NULL,
    ADD COLUMN `quantityAlert` INTEGER NULL,
    ADD COLUMN `sku` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `SalesProducts` DROP COLUMN `productVariantId`,
    ADD COLUMN `productId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `VariantCombinations` DROP COLUMN `productsVariantId`,
    ADD COLUMN `productsId` INTEGER NULL;

-- DropTable
DROP TABLE `ProductsVariant`;

-- CreateIndex
CREATE UNIQUE INDEX `ProductStocks_productId_key` ON `ProductStocks`(`productId`);

-- CreateIndex
CREATE UNIQUE INDEX `Products_productCode_key` ON `Products`(`productCode`);

-- CreateIndex
CREATE UNIQUE INDEX `Products_barCode_key` ON `Products`(`barCode`);

-- CreateIndex
CREATE INDEX `Products_name_id_productCode_barCode_idx` ON `Products`(`name`, `id`, `productCode`, `barCode`);

-- AddForeignKey
ALTER TABLE `VariantCombinations` ADD CONSTRAINT `VariantCombinations_productsId_fkey` FOREIGN KEY (`productsId`) REFERENCES `Products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_productsId_fkey` FOREIGN KEY (`productsId`) REFERENCES `Products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductStocks` ADD CONSTRAINT `ProductStocks_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
