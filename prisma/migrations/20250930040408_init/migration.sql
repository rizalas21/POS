/*
  Warnings:

  - You are about to drop the column `purchasePrice` on the `Goods` table. All the data in the column will be lost.
  - You are about to drop the column `sellingPrice` on the `Goods` table. All the data in the column will be lost.
  - You are about to drop the `PurchaseItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."PurchaseItem" DROP CONSTRAINT "PurchaseItem_invoice_fkey";

-- DropForeignKey
ALTER TABLE "public"."PurchaseItem" DROP CONSTRAINT "PurchaseItem_itemcode_fkey";

-- AlterTable
ALTER TABLE "public"."Goods" DROP COLUMN "purchasePrice",
DROP COLUMN "sellingPrice",
ADD COLUMN     "purchaseprice" DECIMAL(19,2) NOT NULL DEFAULT 1000,
ADD COLUMN     "sellingprice" DECIMAL(19,2) NOT NULL DEFAULT 1000;

-- DropTable
DROP TABLE "public"."PurchaseItem";

-- CreateTable
CREATE TABLE "public"."Purchaseitems" (
    "id" SERIAL NOT NULL,
    "invoice" VARCHAR(20) NOT NULL,
    "itemcode" VARCHAR(20) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "purchaseprice" DECIMAL(19,2) NOT NULL,
    "totalprice" DECIMAL(19,2) NOT NULL,

    CONSTRAINT "Purchaseitems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Purchaseitems" ADD CONSTRAINT "Purchaseitems_invoice_fkey" FOREIGN KEY ("invoice") REFERENCES "public"."Purchases"("invoice") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Purchaseitems" ADD CONSTRAINT "Purchaseitems_itemcode_fkey" FOREIGN KEY ("itemcode") REFERENCES "public"."Goods"("barcode") ON DELETE RESTRICT ON UPDATE CASCADE;
