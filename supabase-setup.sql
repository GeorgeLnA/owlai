-- Create the owl_ai_contact_submissions table in Supabase
-- Run this SQL in your Supabase SQL Editor: https://app.supabase.com/project/_/sql
-- Note: This table is set to unrestricted (RLS disabled) for public form submissions

CREATE TABLE IF NOT EXISTS owl_ai_contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT NOT NULL,
  problems TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Since the table is unrestricted, RLS is disabled
-- No policies needed - anyone can insert and read

-- Create an index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_owl_ai_contact_submissions_created_at 
  ON owl_ai_contact_submissions(created_at DESC);

-- If the table already exists, add the problems column (run this if you're updating an existing table)
ALTER TABLE owl_ai_contact_submissions ADD COLUMN IF NOT EXISTS problems TEXT;