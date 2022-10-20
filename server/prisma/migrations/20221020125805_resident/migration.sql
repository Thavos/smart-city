/*
  Warnings:

  - You are about to alter the column `id` on the `Resident` table. The data in that column will be cast from `Uuid` to `String`. This cast may fail. Please make sure the data in the column can be cast.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_Resident" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "Resident_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Resident" ("id","name") SELECT "id","name" FROM "Resident";
DROP TABLE "Resident" CASCADE;
ALTER TABLE "_prisma_new_Resident" RENAME TO "Resident";
