-- CreateTable
CREATE TABLE "public"."Purchases" (
    "invoice" VARCHAR(20) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalsum" DECIMAL(19,2) NOT NULL,
    "supplierid" INTEGER NOT NULL,
    "operator" TEXT NOT NULL,

    CONSTRAINT "Purchases_pkey" PRIMARY KEY ("invoice")
);

-- CreateTable
CREATE TABLE "public"."PurchaseItem" (
    "id" SERIAL NOT NULL,
    "invoice" VARCHAR(20) NOT NULL,
    "itemcode" VARCHAR(20) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "purchasePrice" DECIMAL(19,2) NOT NULL,
    "totalprice" DECIMAL(19,2) NOT NULL,

    CONSTRAINT "PurchaseItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Purchases" ADD CONSTRAINT "Purchases_supplierid_fkey" FOREIGN KEY ("supplierid") REFERENCES "public"."Suppliers"("supplierid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Purchases" ADD CONSTRAINT "Purchases_operator_fkey" FOREIGN KEY ("operator") REFERENCES "public"."Users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PurchaseItem" ADD CONSTRAINT "PurchaseItem_invoice_fkey" FOREIGN KEY ("invoice") REFERENCES "public"."Purchases"("invoice") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PurchaseItem" ADD CONSTRAINT "PurchaseItem_itemcode_fkey" FOREIGN KEY ("itemcode") REFERENCES "public"."Goods"("barcode") ON DELETE RESTRICT ON UPDATE CASCADE;
