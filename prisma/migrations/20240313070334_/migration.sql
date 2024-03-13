/*
  Warnings:

  - A unique constraint covering the columns `[salesmnaId]` on the table `Raks` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Products` ADD COLUMN `raksId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Raks` ADD COLUMN `salesmnaId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Raks_salesmnaId_key` ON `Raks`(`salesmnaId`);

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_raksId_fkey` FOREIGN KEY (`raksId`) REFERENCES `Raks`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Raks` ADD CONSTRAINT `Raks_salesmnaId_fkey` FOREIGN KEY (`salesmnaId`) REFERENCES `Employees`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
