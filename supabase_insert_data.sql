-- ============================================
-- Insert initial data into Supabase tables
-- Run this AFTER creating the tables
-- ============================================

-- Insert initial MeetingData
INSERT INTO "MeetingData" (id, title, date, total, "inProgress", completed, issues, "codeReviewer", "createdAt", "updatedAt")
VALUES (
    1,
    'สรุปการประชุมประจำสัปดาห์ทีมพัฒนา ปี 2568',
    'สัปดาห์ที่ 30 วันที่ 05/08/2568',
    44,
    30,
    14,
    12,
    'อารยา ฉายางาม (เอิร์น)',
    NOW(),
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- Note: You can add projects, issues, and code reviews later through the web interface
-- Or insert them manually using the Supabase Table Editor

