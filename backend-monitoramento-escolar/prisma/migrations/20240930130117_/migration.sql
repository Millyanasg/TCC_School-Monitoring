/*
  Warnings:

  - You are about to drop the column `latitute` on the `ChildLocations` table. All the data in the column will be lost.
  - You are about to drop the column `latitute` on the `HomeAddress` table. All the data in the column will be lost.
  - You are about to drop the column `latitute` on the `School` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `ChildLocations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `HomeAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `School` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `longitude` on the `School` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ChildLocations" DROP COLUMN "latitute",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "HomeAddress" DROP COLUMN "latitute",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "School" DROP COLUMN "latitute",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
DROP COLUMN "longitude",
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;
