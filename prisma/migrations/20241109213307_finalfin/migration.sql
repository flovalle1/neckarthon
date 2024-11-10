/*
  Warnings:

  - You are about to drop the column `five` on the `Meinungsbild` table. All the data in the column will be lost.
  - You are about to drop the column `four` on the `Meinungsbild` table. All the data in the column will be lost.
  - You are about to drop the column `one` on the `Meinungsbild` table. All the data in the column will be lost.
  - You are about to drop the column `three` on the `Meinungsbild` table. All the data in the column will be lost.
  - You are about to drop the column `two` on the `Meinungsbild` table. All the data in the column will be lost.
  - Added the required column `meinung` to the `Meinungsbild` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Meinungsbild` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Meinungsbild` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meinungsbild" DROP COLUMN "five",
DROP COLUMN "four",
DROP COLUMN "one",
DROP COLUMN "three",
DROP COLUMN "two",
ADD COLUMN     "meinung" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL;
