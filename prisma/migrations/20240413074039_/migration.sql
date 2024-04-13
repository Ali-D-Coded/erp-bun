-- AlterTable
ALTER TABLE `Admins` ADD COLUMN `refreshToken` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Employees` ADD COLUMN `refreshToken` VARCHAR(191) NULL;
