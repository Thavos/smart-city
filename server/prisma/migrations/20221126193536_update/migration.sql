/*
  Warnings:

  - You are about to drop the column `comment` on the `ServiceRequest` table. All the data in the column will be lost.
  - Added the required column `serviceRequestId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "serviceRequestId" STRING NOT NULL;

-- AlterTable
ALTER TABLE "ServiceRequest" DROP COLUMN "comment";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "ServiceRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
