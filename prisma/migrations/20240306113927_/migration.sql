/*
  Warnings:

  - You are about to drop the column `salesManId` on the `SalesCommission` table. All the data in the column will be lost.
  - You are about to alter the column `saleId` on the `SalesCommission` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `SalesCommission` DROP COLUMN `salesManId`,
    ADD COLUMN `salesmanId` INTEGER NULL,
    MODIFY `saleId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `SalesCommission` ADD CONSTRAINT `SalesCommission_salesmanId_fkey` FOREIGN KEY (`salesmanId`) REFERENCES `Employees`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
