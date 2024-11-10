/*
  Warnings:

  - You are about to drop the `IdeenMessage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `five` to the `Meinungsbild` table without a default value. This is not possible if the table is not empty.
  - Added the required column `four` to the `Meinungsbild` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meinungsbild" ADD COLUMN     "five" INTEGER NOT NULL,
ADD COLUMN     "four" INTEGER NOT NULL;

-- DropTable
DROP TABLE "IdeenMessage";
