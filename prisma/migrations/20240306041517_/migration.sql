-- AlterTable
ALTER TABLE `Purchase` ADD COLUMN `vendorsId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_vendorsId_fkey` FOREIGN KEY (`vendorsId`) REFERENCES `Vendors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
