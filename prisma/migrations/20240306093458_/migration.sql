/*
  Warnings:

  - You are about to drop the column `customerId` on the `Sales` table. All the data in the column will be lost.
  - You are about to alter the column `accountantId` on the `Sales` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `salesManId` on the `Sales` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Sales` DROP COLUMN `customerId`,
    MODIFY `accountantId` INTEGER NULL,
    MODIFY `salesManId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_accountantId_fkey` FOREIGN KEY (`accountantId`) REFERENCES `Employees`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_salesManId_fkey` FOREIGN KEY (`salesManId`) REFERENCES `Employees`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
