/*
  Warnings:

  - You are about to drop the column `purchaseprice` on the `Goods` table. All the data in the column will be lost.
  - You are about to drop the column `sellingprice` on the `Goods` table. All the data in the column will be lost.
  - Added the required column `purchasePrice` to the `Goods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellingPrice` to the `Goods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Goods" DROP COLUMN "purchaseprice",
DROP COLUMN "sellingprice",
ADD COLUMN     "purchasePrice" DECIMAL(19,2) NOT NULL,
ADD COLUMN     "sellingPrice" DECIMAL(19,2) NOT NULL;
