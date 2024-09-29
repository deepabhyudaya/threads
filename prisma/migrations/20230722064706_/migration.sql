-- AlterTable
ALTER TABLE `User` MODIFY `avatar_type` ENUM('File', 'Url', 'Default') NULL DEFAULT 'Default';
