/*
  Warnings:

  - A unique constraint covering the columns `[repost_from_id,author_id]` on the table `Thread` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Thread_repost_from_id_author_id_key` ON `Thread`(`repost_from_id`, `author_id`);
