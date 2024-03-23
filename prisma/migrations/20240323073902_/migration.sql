-- DropForeignKey
ALTER TABLE `Location` DROP FOREIGN KEY `Location_wareHouseId_fkey`;

-- AlterTable
ALTER TABLE `Location` MODIFY `wareHouseId` INTEGER NULL;

-- AlterTable
ALTER TABLE `WareHouse` ADD COLUMN `storesId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `WareHouse` ADD CONSTRAINT `WareHouse_storesId_fkey` FOREIGN KEY (`storesId`) REFERENCES `Stores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_wareHouseId_fkey` FOREIGN KEY (`wareHouseId`) REFERENCES `WareHouse`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
