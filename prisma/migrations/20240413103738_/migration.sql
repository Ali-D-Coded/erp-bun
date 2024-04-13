/*
  Warnings:

  - A unique constraint covering the columns `[refreshToken]` on the table `Admins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refreshToken]` on the table `Employees` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Admins_refreshToken_key` ON `Admins`(`refreshToken`);

-- CreateIndex
CREATE UNIQUE INDEX `Employees_refreshToken_key` ON `Employees`(`refreshToken`);
