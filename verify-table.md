# Verify Supabase Table Setup

## Step 1: Check if Table Exists

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project
3. Go to **Table Editor** in the left sidebar
4. Look for a table named exactly: `owl_ai_contact_submissions`

## Step 2: If Table Doesn't Exist, Create It

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New Query**
3. Copy and paste this SQL:

```sql
CREATE TABLE IF NOT EXISTS owl_ai_contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);
```

4. Click **Run** (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned"

## Step 3: Make Table Unrestricted

1. Go back to **Table Editor**
2. Click on the `owl_ai_contact_submissions` table
3. Click the **Settings** icon (gear) or go to the table settings
4. Find **Row Level Security (RLS)**
5. Make sure it's **DISABLED** (toggle should be OFF)
6. If it was enabled, disable it and save

## Step 4: Verify Table Structure

The table should have these columns:
- `id` (UUID, Primary Key)
- `name` (Text)
- `email` (Text)
- `telephone` (Text)
- `created_at` (Timestamp)

## Step 5: Test the Connection

After creating the table, try submitting the form again. The error should be resolved.

## Common Issues

### Table name mismatch
- Make sure the table name is exactly `owl_ai_contact_submissions` (lowercase, with underscores)
- No spaces, no dashes, no special characters

### RLS still enabled
- Even if you think it's disabled, double-check in Table Editor → Settings
- The table must be completely unrestricted for public form submissions

### Schema issues
- Make sure the table is in the `public` schema (default)
- You can verify this in the SQL Editor by running: `SELECT * FROM public.owl_ai_contact_submissions LIMIT 1;`

