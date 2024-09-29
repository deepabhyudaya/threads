/*
  Warnings:

  - Made the column `avatar_type` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `avatar_type` ENUM('File', 'Url', 'Default') NOT NULL DEFAULT 'Default';
