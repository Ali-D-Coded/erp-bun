/*
  Warnings:

  - A unique constraint covering the columns `[rolesId]` on the table `Privileges` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Privileges_rolesId_key` ON `Privileges`(`rolesId`);
