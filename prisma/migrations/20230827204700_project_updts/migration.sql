/*
  Warnings:

  - You are about to drop the column `content` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Task` table. All the data in the column will be lost.
  - Added the required column `name` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "content",
DROP COLUMN "published",
DROP COLUMN "title",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
