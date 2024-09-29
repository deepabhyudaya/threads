/*
  Warnings:

  - A unique constraint covering the columns `[user_requested_to_follow_id,user_to_be_followed_id]` on the table `Friendship` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Friendship_user_requested_to_follow_id_user_to_be_followed_i_key` ON `Friendship`(`user_requested_to_follow_id`, `user_to_be_followed_id`);
