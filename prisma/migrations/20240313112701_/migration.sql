/*
  Warnings:

  - Added the required column `vatNo` to the `Vendors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Vendors` ADD COLUMN `vatNo` VARCHAR(191) NOT NULL;
