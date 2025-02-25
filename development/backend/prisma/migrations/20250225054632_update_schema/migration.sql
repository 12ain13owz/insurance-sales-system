/*
  Warnings:

  - The `status` column on the `Policy` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[name]` on the table `InsurancePlan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PolicyStatus" AS ENUM ('PENDING', 'PAID', 'EXPIRED');

-- AlterTable
ALTER TABLE "Policy" DROP COLUMN "status",
ADD COLUMN     "status" "PolicyStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "InsurancePlan_name_key" ON "InsurancePlan"("name");

-- CreateIndex
CREATE INDEX "Policy_email_idx" ON "Policy"("email");

-- CreateIndex
CREATE INDEX "Policy_policyNumber_idx" ON "Policy"("policyNumber");

-- CreateIndex
CREATE INDEX "Policy_identifyNumber_idx" ON "Policy"("identifyNumber");
