/*
  Warnings:

  - You are about to drop the column `name` on the `ProductStocks` table. All the data in the column will be lost.
  - Added the required column `productName` to the `ProductStocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ProductStocks` DROP COLUMN `name`,
    ADD COLUMN `productName` VARCHAR(540) NOT NULL;
