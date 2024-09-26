/*
  Warnings:

  - You are about to drop the column `coordinates` on the `School` table. All the data in the column will be lost.
  - Added the required column `latitute` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driverId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('pickup', 'dropoff');

-- AlterTable
ALTER TABLE "School" DROP COLUMN "coordinates",
ADD COLUMN     "latitute" TEXT NOT NULL,
ADD COLUMN     "longitude" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "driverId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "HomeAddress" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "latitute" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "parentId" INTEGER NOT NULL,

    CONSTRAINT "HomeAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChildLocations" (
    "id" SERIAL NOT NULL,
    "childId" INTEGER NOT NULL,
    "latitute" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "type" "LocationType" NOT NULL,

    CONSTRAINT "ChildLocations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HomeAddress_parentId_key" ON "HomeAddress"("parentId");

-- AddForeignKey
ALTER TABLE "HomeAddress" ADD CONSTRAINT "HomeAddress_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildLocations" ADD CONSTRAINT "ChildLocations_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
