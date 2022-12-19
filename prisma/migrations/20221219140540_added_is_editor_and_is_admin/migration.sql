-- AlterTable
ALTER TABLE `User` ADD COLUMN `is_admin` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `is_editor` BOOLEAN NULL DEFAULT false;

-- CreateTable
CREATE TABLE `SubGenre` (
    `id` VARCHAR(191) NOT NULL,
    `genreId` VARCHAR(191) NOT NULL,
    `sub_genre` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SubGenre` ADD CONSTRAINT `SubGenre_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
