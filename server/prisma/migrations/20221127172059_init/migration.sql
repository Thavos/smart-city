-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "surn" STRING NOT NULL,
    "email" STRING NOT NULL,
    "pwd" STRING NOT NULL,
    "authId" INT4 NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technician" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,

    CONSTRAINT "Technician_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "desc" STRING,
    "state" INT4 NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" STRING DEFAULT 'FormerUser',

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceRequest" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "desc" STRING NOT NULL,
    "state" INT4 NOT NULL,
    "expectedFinish" TIMESTAMP(3) NOT NULL,
    "price" FLOAT8 NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "technicianId" STRING DEFAULT 'FormerTechnician',
    "managerId" STRING DEFAULT 'FormerTechnician',

    CONSTRAINT "ServiceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" STRING NOT NULL,
    "desc" STRING NOT NULL,
    "isService" BOOL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" STRING DEFAULT 'FormerUser',
    "ticketId" STRING,
    "serviceRequestId" STRING,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Technician_id_key" ON "Technician"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Technician_userId_key" ON "Technician"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_id_key" ON "Manager"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_userId_key" ON "Manager"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_id_key" ON "Ticket"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceRequest_id_key" ON "ServiceRequest"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_id_key" ON "Comment"("id");

-- AddForeignKey
ALTER TABLE "Technician" ADD CONSTRAINT "Technician_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "Technician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "ServiceRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
