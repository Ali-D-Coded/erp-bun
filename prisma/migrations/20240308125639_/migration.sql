/*
  Warnings:

  - Added the required column `productCode` to the `SalesProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SalesProducts` ADD COLUMN `productCode` INTEGER NOT NULL;
