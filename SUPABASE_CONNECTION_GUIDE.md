# Complete Supabase Connection Guide

This guide explains how Supabase was connected to this project, step by step, so you can replicate it for another project.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Install Supabase Package](#step-1-install-supabase-package)
3. [Step 2: Create Supabase Project](#step-2-create-supabase-project)
4. [Step 3: Get Your Credentials](#step-3-get-your-credentials)
5. [Step 4: Set Up Environment Variables](#step-4-set-up-environment-variables)
6. [Step 5: Create Supabase Client](#step-5-create-supabase-client)
7. [Step 6: Create Database Tables](#step-6-create-database-tables)
8. [Step 7: Use Supabase in Your Components](#step-7-use-supabase-in-your-components)
9. [Example Usage](#example-usage)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- A Supabase account (free tier is sufficient)
- Node.js and npm installed
- A React/Vite project (or similar frontend framework)

---

## Step 1: Install Supabase Package

Install the Supabase JavaScript client library:

```bash
npm install @supabase/supabase-js
```

**Note:** In this project, we're using version `^2.90.1`. You can check your `package.json` to see the exact version installed.

---

## Step 2: Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in to your account
3. Click **"New Project"**
4. Fill in your project details:
   - **Name**: Choose a project name (e.g., "my-project")
   - **Database Password**: Choose a strong password (⚠️ **SAVE THIS** - you'll need it later!)
   - **Region**: Select the closest region to your users
5. Click **"Create new project"**
6. Wait for the project to be created (this takes a few minutes)

---

## Step 3: Get Your Credentials

Once your project is created:

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll find two important values:

   - **Project URL** (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
     - This is your `VITE_SUPABASE_URL`
   
   - **anon/public key** (a long string starting with `eyJ...`)
     - This is your `VITE_SUPABASE_ANON_KEY`
     - This key is safe to expose in your frontend code (it's designed for public use)

3. Copy both values - you'll need them in the next step

---

## Step 4: Set Up Environment Variables

1. **Create a `.env` file** in the root of your project (if it doesn't exist)

2. **Add the following variables:**

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

3. **Replace the placeholder values** with your actual credentials from Step 3:
   - Replace `your_project_url_here` with your Project URL
   - Replace `your_anon_key_here` with your anon/public key

4. **Important Security Notes:**
   - The `.env` file should already be in your `.gitignore` (never commit it!)
   - If you're using Vite (like this project), environment variables must be prefixed with `VITE_` to be accessible in the frontend
   - For production, you'll need to set these environment variables in your hosting platform

---

## Step 5: Create Supabase Client

Create a file to initialize your Supabase client. In this project, it's located at:

**`src/lib/supabase.ts`**

Here's the complete code:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only throw error in development to help with setup
if (import.meta.env.DEV && (!supabaseUrl || !supabaseAnonKey)) {
  console.error(
    '⚠️ Missing Supabase environment variables.\n' +
    'Please create a .env file with:\n' +
    'VITE_SUPABASE_URL=your_project_url\n' +
    'VITE_SUPABASE_ANON_KEY=your_anon_key\n\n' +
    'See SUPABASE_SETUP.md for instructions.'
  );
}

// Create client with fallback values (will fail gracefully if env vars are missing)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
```

**Key Points:**
- Uses `import.meta.env` for Vite environment variables
- Provides helpful error messages in development
- Exports a singleton `supabase` client that you can import anywhere

---

## Step 6: Create Database Tables

You need to create tables in your Supabase database to store data.

### Option A: Using SQL Editor (Recommended)

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Write your SQL to create the table

### Example Tables from This Project

#### Table 1: Contact Submissions

This table stores contact form submissions:

```sql
-- Create the owl_ai_contact_submissions table
CREATE TABLE IF NOT EXISTS owl_ai_contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT NOT NULL,
  problems TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create an index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_owl_ai_contact_submissions_created_at 
  ON owl_ai_contact_submissions(created_at DESC);
```

#### Table 2: Demo Requests

This table stores demo request form submissions:

```sql
-- Create the owl_ai_demo_requests table
CREATE TABLE IF NOT EXISTS owl_ai_demo_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  title TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_owl_ai_demo_requests_created_at 
  ON owl_ai_demo_requests(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_owl_ai_demo_requests_email 
  ON owl_ai_demo_requests(email);
```

### Option B: Using Table Editor (Visual)

1. Go to **Table Editor** in your Supabase dashboard
2. Click **"New Table"**
3. Add columns manually
4. Set appropriate data types and constraints

### ⚠️ Important: Row Level Security (RLS)

For public form submissions, you have two options:

**Option 1: Disable RLS (Simpler, for public forms)**
- In the table settings, disable Row Level Security
- This allows anyone to insert data (good for contact forms)

**Option 2: Enable RLS with Policies (More secure)**
- Keep RLS enabled
- Create insert policies that allow public access
- Example policy:
  ```sql
  CREATE POLICY "Allow public inserts" ON owl_ai_contact_submissions
  FOR INSERT TO public
  WITH CHECK (true);
  ```

**In this project, RLS is disabled for simplicity** since these are public contact forms.

---

## Step 7: Use Supabase in Your Components

### Basic Import

In any component where you need to interact with Supabase:

```typescript
import { supabase } from '../../lib/supabase'; // Adjust path as needed
```

### Common Operations

#### 1. Insert Data (Create)

```typescript
const handleSubmit = async (formData) => {
  try {
    const { data, error } = await supabase
      .from('your_table_name')
      .insert({
        name: formData.name,
        email: formData.email,
        // ... other fields
      })
      .select(); // Returns the inserted row

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Data inserted successfully:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### 2. Read Data (Select)

```typescript
// Get all rows
const { data, error } = await supabase
  .from('your_table_name')
  .select('*');

// Get specific columns
const { data, error } = await supabase
  .from('your_table_name')
  .select('name, email, created_at');

// With filtering
const { data, error } = await supabase
  .from('your_table_name')
  .select('*')
  .eq('email', 'user@example.com')
  .order('created_at', { ascending: false });
```

#### 3. Update Data

```typescript
const { data, error } = await supabase
  .from('your_table_name')
  .update({ name: 'New Name' })
  .eq('id', 'some-id');
```

#### 4. Delete Data

```typescript
const { data, error } = await supabase
  .from('your_table_name')
  .delete()
  .eq('id', 'some-id');
```

---

## Example Usage

Here's a complete example from this project showing how a form submission is handled:

```typescript
import { supabase } from '../../lib/supabase';

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // Insert data into Supabase
    const { data, error } = await supabase
      .from('owl_ai_contact_submissions')
      .insert({
        name: formData.name,
        email: formData.email,
        telephone: formData.telephone,
        problems: formData.problems || null
      })
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Success - data was inserted
    console.log('Submission successful:', data);
    setSubmitStatus({ type: 'success', message: 'Thank you! We\'ll get back to you soon.' });
    
    // Reset form
    setFormData({ name: '', email: '', telephone: '', problems: '' });

  } catch (error: any) {
    // Handle errors
    console.error('Error submitting form:', error);
    setSubmitStatus({ 
      type: 'error', 
      message: error?.message || 'Something went wrong. Please try again.' 
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## Project Structure Summary

In this project, Supabase is organized as follows:

```
owlai/
├── src/
│   ├── lib/
│   │   └── supabase.ts          # Supabase client initialization
│   └── screens/
│       ├── ElementLight/sections/
│       │   └── Section05_Reviews/
│       │       └── Section05_Reviews.tsx  # Uses supabase for contact form
│       └── DemoPage/
│           └── DemoPage.tsx               # Uses supabase for demo requests
├── .env                             # Environment variables (not in git)
├── .env.example                     # Example env file (optional)
├── supabase-setup.sql               # SQL for contact submissions table
├── supabase-demo-table.sql          # SQL for demo requests table
└── SUPABASE_SETUP.md                # Setup documentation
```

---

## Troubleshooting

### Error: "Missing Supabase environment variables"

**Solution:**
1. Make sure your `.env` file exists in the project root
2. Verify variable names are exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. Restart your dev server after creating/updating `.env`
4. Check that there are no typos or extra spaces

### Error: "relation 'table_name' does not exist"

**Solution:**
1. Make sure you ran the SQL script to create the table
2. Check the table name matches exactly (case-sensitive)
3. Verify you're in the correct Supabase project
4. Go to Table Editor in Supabase to confirm the table exists

### Error: "new row violates row-level security policy"

**Solution:**
1. Check if RLS is enabled on your table
2. Either disable RLS (for public forms) or create appropriate policies
3. Go to Table Editor → Your Table → Settings → Row Level Security

### Form submits but data doesn't appear

**Solution:**
1. Check browser console for errors
2. Verify table name matches exactly
3. Check Supabase logs: Dashboard → Logs → API Logs
4. Verify RLS settings allow inserts
5. Make sure you're checking the correct Supabase project

### Error: "Failed to fetch" or Network Errors

**Solution:**
1. Check your internet connection
2. Verify the `VITE_SUPABASE_URL` is correct
3. Check if your Supabase project is paused (free tier pauses after inactivity)
4. Verify CORS settings in Supabase (should work by default)

---

## Quick Start Checklist

Use this checklist to set up Supabase in a new project:

- [ ] Install `@supabase/supabase-js` package
- [ ] Create Supabase project at app.supabase.com
- [ ] Get Project URL and anon key from Settings → API
- [ ] Create `.env` file with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- [ ] Create `src/lib/supabase.ts` file with client initialization
- [ ] Create database tables (via SQL Editor or Table Editor)
- [ ] Configure RLS settings (disable for public forms or create policies)
- [ ] Import and use `supabase` client in your components
- [ ] Test by inserting data and checking Supabase dashboard
- [ ] Restart dev server to load environment variables

---

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client Reference](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

## Notes for Different Frameworks

### If using Create React App:

- Use `REACT_APP_` prefix instead of `VITE_`
- Access via `process.env.REACT_APP_SUPABASE_URL`

### If using Next.js:

- Use `NEXT_PUBLIC_` prefix
- Access via `process.env.NEXT_PUBLIC_SUPABASE_URL`
- Can use server-side Supabase client for API routes

### If using plain JavaScript/HTML:

- You can use Supabase via CDN
- No environment variables needed (but less secure)
- Example: `<script type="module" src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm"></script>`

---

**Last Updated:** Based on project setup from owlai project
**Supabase Package Version:** ^2.90.1
