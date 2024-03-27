/*
  Warnings:

  - The primary key for the `Privileges` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Privileges` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `VariantCombinations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `VariantCombinations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `Privileges` DROP FOREIGN KEY `Privileges_rolesId_fkey`;

-- DropIndex
DROP INDEX `Privileges_id_key` ON `Privileges`;

-- DropIndex
DROP INDEX `VariantCombinations_id_key` ON `VariantCombinations`;

-- AlterTable
ALTER TABLE `Privileges` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `VariantCombinations` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Privileges` ADD CONSTRAINT `Privileges_rolesId_fkey` FOREIGN KEY (`rolesId`) REFERENCES `Roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
