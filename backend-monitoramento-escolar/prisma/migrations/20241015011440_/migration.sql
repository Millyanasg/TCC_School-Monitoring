-- CreateEnum
CREATE TYPE "seed_type" AS ENUM ('ADMIN', 'COMMON');

-- CreateTable
CREATE TABLE "Seed" (
    "id" TEXT NOT NULL,
    "type" "seed_type" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Seed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seed_type_key" ON "Seed"("type");
