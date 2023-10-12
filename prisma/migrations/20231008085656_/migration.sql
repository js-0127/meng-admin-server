/*
  Warnings:

  - A unique constraint covering the columns `[filePath]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `File_filePath_key` ON `File`(`filePath`);
