-- AlterTable
ALTER TABLE `Thread` ADD COLUMN `repost_from_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Thread` ADD CONSTRAINT `Thread_repost_from_id_fkey` FOREIGN KEY (`repost_from_id`) REFERENCES `Thread`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
