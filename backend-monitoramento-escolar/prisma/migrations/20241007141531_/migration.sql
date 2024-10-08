-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('allowed', 'disallowed', 'pending');

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "parentId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,
    "childId" INTEGER NOT NULL,
    "status" "Permission" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
