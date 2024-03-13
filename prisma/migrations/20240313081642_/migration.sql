/*
  Warnings:

  - Added the required column `bloodGroup` to the `Employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `Employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empCode` to the `Employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `Employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shift` to the `Employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Employees` ADD COLUMN `bloodGroup` VARCHAR(191) NOT NULL,
    ADD COLUMN `dob` VARCHAR(191) NOT NULL,
    ADD COLUMN `empCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    ADD COLUMN `nationality` VARCHAR(191) NOT NULL,
    ADD COLUMN `shift` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Location` ADD COLUMN `employeesId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_employeesId_fkey` FOREIGN KEY (`employeesId`) REFERENCES `Employees`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
