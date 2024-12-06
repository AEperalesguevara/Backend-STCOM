/*
  Warnings:

  - You are about to drop the column `address` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `preferredDate` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Service` table. All the data in the column will be lost.
  - Added the required column `date` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guests` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_userId_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "address",
DROP COLUMN "description",
DROP COLUMN "preferredDate",
DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "guests" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;
