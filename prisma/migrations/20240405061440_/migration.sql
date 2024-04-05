/*
  Warnings:

  - You are about to drop the column `productsId` on the `Media` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Media` DROP FOREIGN KEY `Media_productsId_fkey`;

-- AlterTable
ALTER TABLE `Media` DROP COLUMN `productsId`;

-- AlterTable
ALTER TABLE `Products` ADD COLUMN `images` JSON NULL;
