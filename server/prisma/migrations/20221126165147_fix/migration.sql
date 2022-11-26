/*
  Warnings:

  - The `createAt` column on the `Comment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "createAt";
ALTER TABLE "Comment" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
