-- DropForeignKey
ALTER TABLE `Thread` DROP FOREIGN KEY `Thread_repost_from_id_fkey`;

-- AddForeignKey
ALTER TABLE `Thread` ADD CONSTRAINT `Thread_repost_from_id_fkey` FOREIGN KEY (`repost_from_id`) REFERENCES `Thread`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
