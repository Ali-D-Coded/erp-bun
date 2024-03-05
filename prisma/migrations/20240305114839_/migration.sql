-- CreateTable
CREATE TABLE `ProductStocks` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `productsVariantId` INTEGER NULL,
    `purchaseItemId` INTEGER NULL,
    `quantityInStock` INTEGER NOT NULL,

    UNIQUE INDEX `ProductStocks_id_key`(`id`),
    UNIQUE INDEX `ProductStocks_productsVariantId_key`(`productsVariantId`),
    UNIQUE INDEX `ProductStocks_purchaseItemId_key`(`purchaseItemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductStocks` ADD CONSTRAINT `ProductStocks_productsVariantId_fkey` FOREIGN KEY (`productsVariantId`) REFERENCES `ProductsVariant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductStocks` ADD CONSTRAINT `ProductStocks_purchaseItemId_fkey` FOREIGN KEY (`purchaseItemId`) REFERENCES `PurchaseItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
