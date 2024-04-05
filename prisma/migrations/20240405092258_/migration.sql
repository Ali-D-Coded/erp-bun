/*
  Warnings:

  - You are about to drop the column `productVariantId` on the `PurchaseItem` table. All the data in the column will be lost.
  - Added the required column `productId` to the `PurchaseItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PurchaseItem` DROP COLUMN `productVariantId`,
    ADD COLUMN `productId` INTEGER NOT NULL;
