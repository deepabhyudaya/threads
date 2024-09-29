-- AlterTable
ALTER TABLE `User` ADD COLUMN `isPrivateAccount` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Friendship` (
    `id` VARCHAR(191) NOT NULL,
    `user_to_be_followed_id` VARCHAR(191) NOT NULL,
    `user_requested_to_follow_id` VARCHAR(191) NOT NULL,
    `accepted` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Friendship_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Friendship` ADD CONSTRAINT `Friendship_user_to_be_followed_id_fkey` FOREIGN KEY (`user_to_be_followed_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Friendship` ADD CONSTRAINT `Friendship_user_requested_to_follow_id_fkey` FOREIGN KEY (`user_requested_to_follow_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
