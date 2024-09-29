/*
  Warnings:

  - A unique constraint covering the columns `[user_name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `display_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `user_name` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `avatar` VARCHAR(191) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `display_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `user_name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_user_name_key` ON `User`(`user_name`);
