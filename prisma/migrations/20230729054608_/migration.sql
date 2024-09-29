-- DropForeignKey
ALTER TABLE `Friendship` DROP FOREIGN KEY `Friendship_user_requested_to_follow_id_fkey`;

-- DropForeignKey
ALTER TABLE `Friendship` DROP FOREIGN KEY `Friendship_user_to_be_followed_id_fkey`;

-- DropForeignKey
ALTER TABLE `Like` DROP FOREIGN KEY `Like_thread_id_fkey`;

-- DropForeignKey
ALTER TABLE `Like` DROP FOREIGN KEY `Like_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Thread` DROP FOREIGN KEY `Thread_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `Thread` DROP FOREIGN KEY `Thread_reply_to_id_fkey`;

-- AddForeignKey
ALTER TABLE `Friendship` ADD CONSTRAINT `Friendship_user_to_be_followed_id_fkey` FOREIGN KEY (`user_to_be_followed_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Friendship` ADD CONSTRAINT `Friendship_user_requested_to_follow_id_fkey` FOREIGN KEY (`user_requested_to_follow_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Thread` ADD CONSTRAINT `Thread_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Thread` ADD CONSTRAINT `Thread_reply_to_id_fkey` FOREIGN KEY (`reply_to_id`) REFERENCES `Thread`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_thread_id_fkey` FOREIGN KEY (`thread_id`) REFERENCES `Thread`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
