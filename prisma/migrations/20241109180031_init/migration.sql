-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdeenMessage" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "IdeenMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meinungsbild" (
    "id" SERIAL NOT NULL,
    "one" INTEGER NOT NULL,
    "two" INTEGER NOT NULL,
    "three" INTEGER NOT NULL,

    CONSTRAINT "Meinungsbild_pkey" PRIMARY KEY ("id")
);
