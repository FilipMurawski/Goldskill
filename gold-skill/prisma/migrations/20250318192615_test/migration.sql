/*
  Warnings:

  - You are about to drop the column `subscriptionId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "subscriptionId";

-- AlterTable
ALTER TABLE "UserSubscription" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
