# Supabase Setup Instructions

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: Your project name
   - Database Password: Choose a strong password (save this!)
   - Region: Choose the closest region
5. Wait for the project to be created (takes a few minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll find:
   - **Project URL** (this is your `VITE_SUPABASE_URL`)
   - **anon/public key** (this is your `VITE_SUPABASE_ANON_KEY`)

## Step 3: Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `supabase-setup.sql`
4. Click **Run** to execute the SQL
5. Verify the table was created by going to **Table Editor** → you should see `owl_ai_contact_submissions`
6. **Important**: Make sure the table is set to **unrestricted** (RLS disabled) in the table settings to allow public form submissions

## Step 4: Set Up Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

3. Replace the values with your actual Supabase credentials from Step 2
4. **Important**: Never commit your `.env` file to git (it's already in `.gitignore`)

## Step 5: Restart Your Dev Server

After setting up your `.env` file, restart your development server:

```bash
npm run dev
```

## Testing the Form

1. Fill out the "Get in Touch" form on your website
2. Submit the form
3. Check your Supabase dashboard → **Table Editor** → `owl_ai_contact_submissions` to see the submitted data

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure your `.env` file exists in the project root
- Verify the variable names are exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Restart your dev server after creating/updating `.env`

### Error: "relation 'owl_ai_contact_submissions' does not exist"
- Make sure you ran the SQL script in Step 3
- Check the SQL Editor for any errors
- Verify the table name is exactly `owl_ai_contact_submissions`

### Form submits but data doesn't appear
- Check the browser console for errors
- Verify the table is set to **unrestricted** (RLS disabled) in Supabase dashboard
- Check Supabase logs in the dashboard
- Ensure the table name matches exactly: `owl_ai_contact_submissions`

