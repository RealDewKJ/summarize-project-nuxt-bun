-- ============================================
-- SQL Script to create tables in Supabase
-- Copy and paste this into Supabase SQL Editor
-- ============================================

-- Create MeetingData Table
CREATE TABLE IF NOT EXISTS "MeetingData" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "inProgress" INTEGER NOT NULL,
    "completed" INTEGER NOT NULL,
    "issues" INTEGER NOT NULL,
    "codeReviewer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create Project Table
CREATE TABLE IF NOT EXISTS "Project" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "meetingDataId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Project_meetingDataId_fkey" FOREIGN KEY ("meetingDataId") 
        REFERENCES "MeetingData"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create ProjectDetail Table
CREATE TABLE IF NOT EXISTS "ProjectDetail" (
    "id" SERIAL PRIMARY KEY,
    "orderNum" INTEGER NOT NULL,
    "systemName" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "pm" TEXT NOT NULL,
    "problems" TEXT NOT NULL,
    "solutions" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "meetingDataId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ProjectDetail_meetingDataId_fkey" FOREIGN KEY ("meetingDataId") 
        REFERENCES "MeetingData"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create IssueDetail Table
CREATE TABLE IF NOT EXISTS "IssueDetail" (
    "id" SERIAL PRIMARY KEY,
    "project" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "meetingDataId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "IssueDetail_meetingDataId_fkey" FOREIGN KEY ("meetingDataId") 
        REFERENCES "MeetingData"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create CodeReview Table strictly
CREATE TABLE IF NOT EXISTS "CodeReview" (
    "id" SERIAL PRIMARY KEY,
    "project" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "meetingDataId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CodeReview_meetingDataId_fkey" FOREIGN KEY ("meetingDataId") 
        REFERENCES "MeetingData"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

