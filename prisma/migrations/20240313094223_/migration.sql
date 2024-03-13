/*
  Warnings:

  - You are about to drop the column `salary` on the `Employees` table. All the data in the column will be lost.
  - You are about to drop the column `gross_pay` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `netPay` on the `Payroll` table. All the data in the column will be lost.
  - You are about to alter the column `deductions` on the `Payroll` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Json`.
  - Added the required column `basicSalary` to the `Employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `basicSalary` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `netSalary` to the `Payroll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Employees` DROP COLUMN `salary`,
    ADD COLUMN `basicSalary` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `Payroll` DROP COLUMN `gross_pay`,
    DROP COLUMN `netPay`,
    ADD COLUMN `allowances` JSON NULL,
    ADD COLUMN `basicSalary` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `netSalary` DECIMAL(65, 30) NOT NULL,
    MODIFY `deductions` JSON NULL;

-- CreateTable
CREATE TABLE `VariantAttributes` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `name` VARCHAR(191) NOT NULL,
    `values` JSON NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `VariantAttributes_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Holidays` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `name` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `noOfDays` INTEGER NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Holidays_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
