/*
  Warnings:

  - You are about to drop the column `supplierid` on the `Purchases` table. All the data in the column will be lost.
  - Added the required column `supplier` to the `Purchases` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Purchases" DROP CONSTRAINT "Purchases_supplierid_fkey";

-- AlterTable
ALTER TABLE "public"."Purchases" DROP COLUMN "supplierid",
ADD COLUMN     "supplier" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Purchases" ADD CONSTRAINT "Purchases_supplier_fkey" FOREIGN KEY ("supplier") REFERENCES "public"."Suppliers"("supplierid") ON DELETE RESTRICT ON UPDATE CASCADE;
