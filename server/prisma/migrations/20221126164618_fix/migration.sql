/*
  Warnings:

  - Added the required column `isService` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `createAt` on the `Comment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "isService" BOOL NOT NULL;
ALTER TABLE "Comment" DROP COLUMN "createAt";
ALTER TABLE "Comment" ADD COLUMN     "createAt" INT4 NOT NULL;
