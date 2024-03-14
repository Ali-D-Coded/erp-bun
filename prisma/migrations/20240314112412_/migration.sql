/*
  Warnings:

  - You are about to drop the column `variantValue` on the `ProductsVariant` table. All the data in the column will be lost.
  - You are about to drop the column `salesmnaId` on the `Raks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[salesmanId]` on the table `Raks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quantity` to the `ProductsVariant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityAlert` to the `ProductsVariant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Raks` DROP FOREIGN KEY `Raks_salesmnaId_fkey`;

-- AlterTable
ALTER TABLE `ProductsVariant` DROP COLUMN `variantValue`,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `quantityAlert` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Raks` DROP COLUMN `salesmnaId`,
    ADD COLUMN `salesmanId` INTEGER NULL;

-- CreateTable
CREATE TABLE `VariantCombinations` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `variantType` VARCHAR(191) NOT NULL,
    `variantValue` VARCHAR(191) NOT NULL,
    `productsVariantId` INTEGER NULL,

    UNIQUE INDEX `VariantCombinations_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Raks_salesmanId_key` ON `Raks`(`salesmanId`);

-- AddForeignKey
ALTER TABLE `VariantCombinations` ADD CONSTRAINT `VariantCombinations_productsVariantId_fkey` FOREIGN KEY (`productsVariantId`) REFERENCES `ProductsVariant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Raks` ADD CONSTRAINT `Raks_salesmanId_fkey` FOREIGN KEY (`salesmanId`) REFERENCES `Employees`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
