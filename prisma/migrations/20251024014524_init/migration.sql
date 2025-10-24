/*
  Warnings:

  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."customers";

-- CreateTable
CREATE TABLE "public"."Customers" (
    "customerid" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "address" TEXT NOT NULL,
    "phone" VARCHAR(20) NOT NULL,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("customerid")
);

-- CreateTable
CREATE TABLE "public"."Sales" (
    "invoice" VARCHAR(20) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalsum" DECIMAL(19,2) NOT NULL,
    "pay" DECIMAL(19,2) NOT NULL,
    "change" DECIMAL(19,2) NOT NULL,
    "customer" INTEGER NOT NULL,
    "operator" TEXT NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("invoice")
);

-- CreateTable
CREATE TABLE "public"."Saleitems" (
    "id" SERIAL NOT NULL,
    "invoice" VARCHAR(20) NOT NULL,
    "itemcode" VARCHAR(20) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sellingprice" DECIMAL(19,2) NOT NULL,
    "totalprice" DECIMAL(19,2) NOT NULL,

    CONSTRAINT "Saleitems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Sales" ADD CONSTRAINT "Sales_customer_fkey" FOREIGN KEY ("customer") REFERENCES "public"."Customers"("customerid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sales" ADD CONSTRAINT "Sales_operator_fkey" FOREIGN KEY ("operator") REFERENCES "public"."Users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Saleitems" ADD CONSTRAINT "Saleitems_invoice_fkey" FOREIGN KEY ("invoice") REFERENCES "public"."Sales"("invoice") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Saleitems" ADD CONSTRAINT "Saleitems_itemcode_fkey" FOREIGN KEY ("itemcode") REFERENCES "public"."Goods"("barcode") ON DELETE RESTRICT ON UPDATE CASCADE;
