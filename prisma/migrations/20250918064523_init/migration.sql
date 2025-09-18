-- CreateTable
CREATE TABLE "public"."Suppliers" (
    "supplierid" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "address" TEXT NOT NULL,
    "phone" VARCHAR(20) NOT NULL,

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("supplierid")
);
