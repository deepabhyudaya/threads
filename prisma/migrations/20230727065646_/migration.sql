-- AlterTable
ALTER TABLE `Friendship` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Thread` (
    `id` VARCHAR(191) NOT NULL,
    `author_id` VARCHAR(191) NOT NULL,
    `reply_to_id` VARCHAR(191) NULL,
    `attachment` VARCHAR(191) NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Thread_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Thread` ADD CONSTRAINT `Thread_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Thread` ADD CONSTRAINT `Thread_reply_to_id_fkey` FOREIGN KEY (`reply_to_id`) REFERENCES `Thread`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
