/*
  Warnings:

  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `avatar`,
    ADD COLUMN `avatar_type` ENUM('File', 'Url', 'Default') NULL,
    ADD COLUMN `avatar_value` VARCHAR(191) NULL;
