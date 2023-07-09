/*
  Warnings:

  - You are about to drop the column `name` on the `Performance` table. All the data in the column will be lost.
  - Added the required column `day` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Performance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Performance` DROP COLUMN `name`,
    ADD COLUMN `day` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
