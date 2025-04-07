/*
  Warnings:

  - The `status` column on the `Payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('UNCONFIRMED', 'VERIFIED', 'FAILED', 'REFUNDED');

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "orderId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
DROP COLUMN "status",
ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'UNCONFIRMED';
