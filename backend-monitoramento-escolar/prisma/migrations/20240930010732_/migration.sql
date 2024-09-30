-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phones" TEXT[] DEFAULT ARRAY[]::TEXT[];
