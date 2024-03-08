-- DropForeignKey
ALTER TABLE `Media` DROP FOREIGN KEY `Media_productsVariantId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductsVariant` DROP FOREIGN KEY `ProductsVariant_productsId_fkey`;

-- DropForeignKey
ALTER TABLE `PurchaseItem` DROP FOREIGN KEY `PurchaseItem_purchaseId_fkey`;

-- DropForeignKey
ALTER TABLE `SalesProducts` DROP FOREIGN KEY `SalesProducts_salesId_fkey`;

-- AlterTable
ALTER TABLE `Sales` MODIFY `customersId` INTEGER NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `ProductsVariant` ADD CONSTRAINT `ProductsVariant_productsId_fkey` FOREIGN KEY (`productsId`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_productsVariantId_fkey` FOREIGN KEY (`productsVariantId`) REFERENCES `ProductsVariant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseItem` ADD CONSTRAINT `PurchaseItem_purchaseId_fkey` FOREIGN KEY (`purchaseId`) REFERENCES `Purchase`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesProducts` ADD CONSTRAINT `SalesProducts_salesId_fkey` FOREIGN KEY (`salesId`) REFERENCES `Sales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
