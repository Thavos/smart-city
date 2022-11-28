/*
  Warnings:

  - You are about to drop the column `ticketId` on the `ServiceRequest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServiceRequest" DROP CONSTRAINT "ServiceRequest_ticketId_fkey";

-- AlterTable
ALTER TABLE "ServiceRequest" DROP COLUMN "ticketId";
