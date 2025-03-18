-- AlterTable
ALTER TABLE "User" ADD COLUMN     "salt" TEXT,
ALTER COLUMN "name" DROP NOT NULL;
