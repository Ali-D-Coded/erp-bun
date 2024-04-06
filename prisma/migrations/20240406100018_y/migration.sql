/*
  Warnings:

  - You are about to drop the column `productName` on the `ProductStocks` table. All the data in the column will be lost.
  - Added the required column `name` to the `ProductStocks` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `ProductStocks_productId_key` ON `ProductStocks`;

-- AlterTable
ALTER TABLE `ProductStocks` DROP COLUMN `productName`,
    ADD COLUMN `name` VARCHAR(540) NOT NULL;
