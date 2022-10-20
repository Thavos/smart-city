-- CreateTable
CREATE TABLE "Resident" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,

    CONSTRAINT "Resident_pkey" PRIMARY KEY ("id")
);
