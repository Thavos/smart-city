-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_userId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceRequest" DROP CONSTRAINT "ServiceRequest_managerId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceRequest" DROP CONSTRAINT "ServiceRequest_technicianId_fkey";

-- DropForeignKey
ALTER TABLE "Technician" DROP CONSTRAINT "Technician_userId_fkey";

-- AlterTable
ALTER TABLE "Manager" ALTER COLUMN "userId" SET DEFAULT 'FormerUser';

-- AlterTable
ALTER TABLE "Technician" ALTER COLUMN "userId" SET DEFAULT 'FormerUser';

-- AddForeignKey
ALTER TABLE "Technician" ADD CONSTRAINT "Technician_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "Technician"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
