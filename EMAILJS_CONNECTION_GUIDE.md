# Complete EmailJS Connection Guide

This guide explains how EmailJS was connected to this project, step by step, so you can replicate it for another project.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Install EmailJS Package](#step-1-install-emailjs-package)
3. [Step 2: Create EmailJS Account](#step-2-create-emailjs-account)
4. [Step 3: Set Up Email Service](#step-3-set-up-email-service)
5. [Step 4: Create Email Templates](#step-4-create-email-templates)
6. [Step 5: Get Your Credentials](#step-5-get-your-credentials)
7. [Step 6: Set Up Environment Variables](#step-6-set-up-environment-variables)
8. [Step 7: Create EmailJS Utility File](#step-7-create-emailjs-utility-file)
9. [Step 8: Use EmailJS in Your Components](#step-8-use-emailjs-in-your-components)
10. [Email Templates Structure](#email-templates-structure)
11. [Example Usage](#example-usage)
12. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- An EmailJS account (free tier allows 200 emails/month)
- An email account (Gmail, Outlook, etc.) to send emails from
- Node.js and npm installed
- A React/Vite project (or similar frontend framework)

---

## Step 1: Install EmailJS Package

Install the EmailJS browser library:

```bash
npm install @emailjs/browser
```

**Note:** In this project, we're using version `^4.4.1`. You can check your `package.json` to see the exact version installed.

---

## Step 2: Create EmailJS Account

1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Click **"Sign Up"** (or **"Log In"** if you already have an account)
3. Choose a sign-up method:
   - Email and password
   - Google account
   - GitHub account
4. Verify your email address if required
5. Complete the account setup

---

## Step 3: Set Up Email Service

An Email Service connects EmailJS to your email account. This is how EmailJS sends emails on your behalf.

### 3.1: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for beginners)
   - **Outlook / Office 365**
   - **Yahoo**
   - **Custom SMTP** (for other providers)

### 3.2: Connect Your Email Account

#### For Gmail:

1. Select **Gmail** as the service
2. Click **"Connect Account"**
3. Sign in with your Google account
4. Grant permissions to EmailJS
5. Your Gmail account is now connected

#### For Outlook:

1. Select **Outlook / Office 365** as the service
2. Click **"Connect Account"**
3. Sign in with your Microsoft account
4. Grant permissions to EmailJS
5. Your Outlook account is now connected

#### For Custom SMTP:

1. Select **Custom SMTP**
2. Enter your SMTP settings:
   - Host (e.g., `smtp.gmail.com`)
   - Port (usually `587` or `465`)
   - Username (your email)
   - Password (your email password or app-specific password)
3. Click **"Create Service"**

### 3.3: Note Your Service ID

After creating the service:
- You'll see a **Service ID** (e.g., `service_xxxxxxxxx`)
- **Save this** - you'll need it for the `.env` file
- Give your service a descriptive name (e.g., "OWL AI Contact Form")

---

## Step 4: Create Email Templates

EmailJS uses templates to define the structure and content of your emails. You need to create two templates:

### Template 1: Admin Notification

This email is sent to you when someone submits a form.

1. In EmailJS dashboard, go to **Email Templates**
2. Click **"Create New Template"**
3. Configure the template:

   **General Settings:**
   - **Template Name**: "Admin Notification - [Your Project]"
   - **To Email**: Your admin email (e.g., `admin@yourproject.com`)
   - **To Name**: `Admin` or your team name
   - **From Name**: `Your Project Contact Form`
   - **From Email**: (auto-filled from your email service)
   - **Reply To**: `{{email}}` (the submitter's email)
   - **Subject**: `New Contact Form Submission - [Your Project]`

4. **Template Content**:
   - Switch to **Code Editor** (HTML mode)
   - Copy the HTML from `email-templates/admin-notification.html` (see [Email Templates Structure](#email-templates-structure) section)
   - Or create your own HTML template
   - Use EmailJS template variables: `{{name}}`, `{{email}}`, etc.

5. **Save the template**
6. **Note your Template ID** (e.g., `template_xxxxxxxxx`)

### Template 2: Client Confirmation

This email is sent to the person who submitted the form (confirmation email).

1. Click **"Create New Template"** again
2. Configure the template:

   **General Settings:**
   - **Template Name**: "Client Confirmation - [Your Project]"
   - **To Email**: `{{email}}` ⚠️ **CRITICAL: Must be a variable, not a fixed email!**
   - **To Name**: `{{name}}`
   - **From Name**: `Your Project Team`
   - **From Email**: (auto-filled from your email service)
   - **Reply To**: Your admin email or `{{email}}`
   - **Subject**: `Thank You for Contacting [Your Project]`

3. **Template Content**:
   - Switch to **Code Editor** (HTML mode)
   - Copy the HTML from `email-templates/client-confirmation.html`
   - Or create your own HTML template
   - Use EmailJS template variables

4. **Save the template**
5. **Note your Template ID**

### Template Variables Reference

Both templates can use these variables (passed from your code):

```javascript
{
  name: "John Doe",              // Submitter's name
  email: "john@example.com",     // Submitter's email
  telephone: "+1234567890",      // Phone number
  company: "Acme Corp",          // Company name (optional)
  title: "CEO",                  // Job title (optional)
  problems: "Need help with...", // Problems/message (optional)
  submission_date: "12/25/2024, 3:45:30 PM"  // Auto-generated
}
```

In your EmailJS template, use:
- `{{name}}` - Submitter's name
- `{{email}}` - Submitter's email
- `{{telephone}}` - Phone number
- `{{company}}` - Company name
- `{{title}}` - Job title
- `{{problems}}` - Problems/message
- `{{submission_date}}` - Submission timestamp

---

## Step 5: Get Your Credentials

You need your **Public Key** from EmailJS:

1. In EmailJS dashboard, go to **Account** → **General**
2. Find your **Public Key** (also called API Key)
   - It looks like: `j0u-vBDMa2S6oe_6B`
   - This key is safe to expose in frontend code (it's designed to be public)
3. **Copy this key** - you'll need it for the `.env` file

---

## Step 6: Set Up Environment Variables

1. **Create a `.env` file** in the root of your project (if it doesn't exist)

2. **Add the following variables:**

```env
# EmailJS Configuration
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_ADMIN_TEMPLATE_ID=your_admin_template_id_here
VITE_EMAILJS_CLIENT_TEMPLATE_ID=your_client_template_id_here
VITE_ADMIN_EMAIL=admin@yourproject.com
```

3. **Replace the placeholder values** with your actual credentials:
   - `your_public_key_here` → Your Public Key from Step 5
   - `your_service_id_here` → Your Service ID from Step 3.3
   - `your_admin_template_id_here` → Admin Template ID from Step 4
   - `your_client_template_id_here` → Client Template ID from Step 4
   - `admin@yourproject.com` → Your admin email address

4. **Important Security Notes:**
   - The `.env` file should be in your `.gitignore` (never commit it!)
   - If using Vite, environment variables must be prefixed with `VITE_` to be accessible in frontend
   - For production, set these environment variables in your hosting platform
   - The Public Key is safe to expose (it's designed for frontend use)

---

## Step 7: Create EmailJS Utility File

Create a utility file to handle email sending. In this project, it's located at:

**`src/lib/emailjs.ts`**

Here's the complete code:

```typescript
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
const EMAILJS_CLIENT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CLIENT_TEMPLATE_ID;
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@yourproject.com';

// Initialize EmailJS
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

export interface FormSubmissionData {
  name: string;
  email: string;
  telephone: string;
  company?: string;
  title?: string;
  problems?: string;
  message?: string;
}

export const sendAdminNotification = async (data: FormSubmissionData): Promise<void> => {
  if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_ADMIN_TEMPLATE_ID) {
    console.warn('EmailJS not configured. Skipping admin notification.');
    return;
  }

  try {
    console.log('Sending admin notification email to:', ADMIN_EMAIL);
    
    // Helper function to normalize empty values to "Not provided"
    const normalizeField = (value: string | undefined): string => {
      if (!value || value.trim() === "") return "Not provided";
      return value.trim();
    };
    
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_ADMIN_TEMPLATE_ID,
      {
        to_email: ADMIN_EMAIL,
        // Template variables - unified for both demo and contact forms
        name: data.name || "Not provided",
        email: data.email || "Not provided",
        telephone: normalizeField(data.telephone),
        company: normalizeField(data.company),
        title: normalizeField(data.title),
        problems: normalizeField(data.problems),
        message: data.message || `New form submission from ${data.name}${data.company && data.company.trim() ? ` at ${data.company}` : ""}`,
        submission_date: new Date().toLocaleString(),
        // Backward compatibility with user_ prefixed variables
        user_name: data.name || "Not provided",
        user_email: data.email || "Not provided",
        user_telephone: normalizeField(data.telephone),
        user_company: normalizeField(data.company),
        user_title: normalizeField(data.title),
        user_problems: normalizeField(data.problems),
      }
    );
    console.log('Admin notification email sent successfully:', result);
  } catch (error: any) {
    console.error('Failed to send admin notification:', error);
    // Don't throw - we don't want email failures to break form submission
  }
};

export const sendClientConfirmation = async (data: FormSubmissionData): Promise<void> => {
  if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_CLIENT_TEMPLATE_ID) {
    console.warn('EmailJS not configured. Skipping client confirmation.');
    return;
  }

  try {
    console.log('Sending client confirmation email to:', data.email);
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_CLIENT_TEMPLATE_ID,
      {
        to_email: data.email,
        to_name: data.name,
        from_name: 'Your Project Team',
        // Template variables
        name: data.name,
        email: data.email,
        telephone: data.telephone || "",
        company: data.company || "",
        title: data.title || "",
        submission_date: new Date().toLocaleString(),
        // Backward compatibility
        user_name: data.name,
        user_email: data.email,
        user_telephone: data.telephone || "",
        user_company: data.company || "",
        user_title: data.title || "",
      }
    );
    console.log('Client confirmation email sent successfully:', result);
  } catch (error: any) {
    console.error('Failed to send client confirmation:', error);
    // Don't throw - we don't want email failures to break form submission
  }
};
```

**Key Points:**
- Initializes EmailJS with the public key
- Two main functions: `sendAdminNotification` and `sendClientConfirmation`
- Handles missing values gracefully (converts empty strings to "Not provided")
- Errors are logged but don't break form submission (non-blocking)
- Supports both `{{name}}` and `{{user_name}}` variable formats for flexibility

---

## Step 8: Use EmailJS in Your Components

### Basic Import

In any component where you want to send emails:

```typescript
import { sendAdminNotification, sendClientConfirmation } from '../../lib/emailjs';
```

### Example: Sending Emails After Form Submission

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // ... form validation ...
  
  try {
    // Save to database (e.g., Supabase)
    await saveToDatabase(formData);
    
    // Send emails via EmailJS (non-blocking)
    const emailData = {
      name: formData.name,
      email: formData.email,
      telephone: formData.telephone,
      company: formData.company || "",
      title: formData.title || "",
      problems: formData.problems || "",
    };
    
    // Send both emails in parallel (faster)
    Promise.all([
      sendAdminNotification(emailData),
      sendClientConfirmation(emailData)
    ]).catch(err => {
      console.warn('Email sending failed (non-critical):', err);
      // Emails failing won't break the form submission
    });
    
    // Show success message
    setSubmitStatus('success');
    
  } catch (error) {
    console.error('Form submission error:', error);
    setSubmitStatus('error');
  }
};
```

### Sending Emails Sequentially (If Needed)

If you need to wait for emails to complete before continuing:

```typescript
// Send emails and wait for completion
await Promise.all([
  sendAdminNotification(emailData),
  sendClientConfirmation(emailData)
]);

// Only redirect after emails are sent
window.location.href = '/success';
```

---

## Email Templates Structure

Your email templates should be HTML files. Here's the structure used in this project:

### Admin Notification Template

Located at: `email-templates/admin-notification.html`

**Features:**
- Professional HTML email design
- Responsive (mobile-friendly)
- Displays all form submission details
- Uses EmailJS variables: `{{name}}`, `{{email}}`, `{{telephone}}`, etc.
- Styled with inline CSS (required for email clients)

**Key Sections:**
- Header with gradient background
- Submission details in a styled box
- Timestamp
- Footer with branding

### Client Confirmation Template

Located at: `email-templates/client-confirmation.html`

**Features:**
- Thank you message
- Submission summary
- Call-to-action
- Contact information
- Responsive design

**Key Sections:**
- Personalized greeting with `{{name}}`
- Thank you message
- Submission summary
- Footer with links

### Creating Your Own Templates

1. Start with the provided templates as a base
2. Customize colors, fonts, and branding
3. Replace EmailJS variables with your own
4. Test in EmailJS dashboard using the "Test" button
5. Use inline CSS (most email clients don't support external stylesheets)
6. Test in multiple email clients (Gmail, Outlook, etc.)

---

## Example Usage

Here's a complete example from this project showing how emails are sent after a form submission:

```typescript
import { sendAdminNotification, sendClientConfirmation } from '../../lib/emailjs';
import { supabase } from '../../lib/supabase';

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // 1. Save to database (Supabase)
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert({
        name: formData.name,
        email: formData.email,
        telephone: formData.telephone,
        problems: formData.problems || null
      })
      .select();

    if (error) throw error;

    // 2. Send emails via EmailJS (non-blocking)
    const emailData = {
      name: formData.name,
      email: formData.email,
      telephone: formData.telephone,
      company: "", // Not in this form
      title: "", // Not in this form
    };
    
    Promise.all([
      sendAdminNotification(emailData),
      sendClientConfirmation(emailData)
    ]).catch(err => {
      console.warn('Email sending failed (non-critical):', err);
    });

    // 3. Show success message
    setSubmitStatus({
      type: 'success',
      message: 'Thank you! We\'ll get back to you soon.'
    });
    
    // 4. Reset form
    setFormData({ name: '', email: '', telephone: '', problems: '' });

  } catch (error: any) {
    console.error('Error submitting form:', error);
    setSubmitStatus({
      type: 'error',
      message: 'Something went wrong. Please try again.'
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## Project Structure Summary

In this project, EmailJS is organized as follows:

```
owlai/
├── src/
│   ├── lib/
│   │   └── emailjs.ts                    # EmailJS utility functions
│   └── screens/
│       ├── ElementLight/sections/
│       │   └── Section05_Reviews/
│       │       └── Section05_Reviews.tsx # Uses EmailJS for contact form
│       └── DemoPage/
│           └── DemoPage.tsx              # Uses EmailJS for demo requests
├── email-templates/
│   ├── admin-notification.html           # Admin email template
│   └── client-confirmation.html          # Client confirmation template
├── .env                                  # Environment variables (not in git)
└── EMAILJS_SETUP.md                      # Setup documentation
```

---

## Troubleshooting

### Error: "EmailJS not configured"

**Solution:**
1. Check your `.env` file exists and has all required variables
2. Verify variable names are exactly: `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, etc.
3. Restart your dev server after creating/updating `.env`
4. Check for typos in environment variable names

### Error: "Invalid public key" or "Service not found"

**Solution:**
1. Verify your Public Key is correct in `.env`
2. Check your Service ID matches the one in EmailJS dashboard
3. Ensure your email service is still connected and active
4. Check EmailJS dashboard for service status

### Emails not sending

**Solution:**
1. **Check EmailJS Logs:**
   - Go to EmailJS Dashboard → **Logs**
   - Look for recent attempts and errors
   - Check error messages

2. **Verify Template IDs:**
   - Ensure Admin Template ID matches your template
   - Ensure Client Template ID matches your template
   - Template IDs look like: `template_xxxxxxxxx`

3. **Check Template Settings:**
   - Admin template: "To Email" should be your admin email
   - Client template: "To Email" **MUST** be `{{email}}` (variable, not fixed email!)
   - Verify "Reply To" is set correctly

4. **Test Templates:**
   - Use the "Test" button in EmailJS template editor
   - Fill in test data
   - Verify emails are received

5. **Check Email Service:**
   - Go to Email Services in EmailJS
   - Verify your service is connected and active
   - Reconnect if needed

6. **Browser Console:**
   - Open Developer Tools (F12) → Console
   - Look for email sending logs
   - Check for error messages

### Client confirmation emails not received

**Common Cause:** "To Email" field in client template is set to a fixed address instead of `{{email}}`

**Solution:**
1. Go to Email Templates → Client Confirmation template
2. Edit the template
3. Set "To Email" to: `{{email}}` (not your email address!)
4. Save and test

### Emails going to spam

**Solution:**
1. **Verify Email Service:**
   - Ensure your email service is properly connected
   - Use a verified email address

2. **Template Settings:**
   - Use a proper "From Name" (e.g., "Your Company Name")
   - Set "Reply To" to a real email address
   - Include unsubscribe links if required

3. **Email Content:**
   - Avoid spam trigger words
   - Don't use excessive capitalization
   - Include proper HTML structure

4. **EmailJS Limits:**
   - Free tier: 200 emails/month
   - Check if you've exceeded the limit

### Template variables not working

**Solution:**
1. **Variable Names:**
   - Must match exactly (case-sensitive)
   - Use double curly braces: `{{variable_name}}`
   - Check variable names in your `emailjs.ts` file match template

2. **Template Editor:**
   - Make sure you're using the Code Editor (HTML mode)
   - Variables should be in the HTML content, not in settings

3. **Test with Sample Data:**
   - Use EmailJS dashboard "Test" button
   - Fill in test data
   - Verify variables are populated

### "Failed to send" errors

**Solution:**
1. **Check EmailJS Status:**
   - Visit EmailJS status page
   - Check if there's a service outage

2. **Verify Limits:**
   - Free tier: 200 emails/month
   - Check your usage in EmailJS dashboard
   - Upgrade if needed

3. **Network Issues:**
   - Check your internet connection
   - Verify firewall isn't blocking requests
   - Try again later

4. **Service Connection:**
   - Reconnect your email service
   - Verify email service credentials are correct

---

## Quick Start Checklist

Use this checklist to set up EmailJS in a new project:

- [ ] Install `@emailjs/browser` package
- [ ] Create EmailJS account at emailjs.com
- [ ] Set up email service (Gmail/Outlook/etc.)
- [ ] Note your Service ID
- [ ] Create admin notification template
- [ ] Create client confirmation template
- [ ] Note your Template IDs
- [ ] Get Public Key from Account → General
- [ ] Create `.env` file with all EmailJS variables
- [ ] Create `src/lib/emailjs.ts` utility file
- [ ] Import and use email functions in your components
- [ ] Test templates in EmailJS dashboard
- [ ] Test form submission with real email addresses
- [ ] Check spam folders if emails don't arrive
- [ ] Restart dev server to load environment variables

---

## EmailJS Free Tier Limits

**Free Plan:**
- **200 emails per month**
- Basic email templates
- All standard features
- EmailJS branding in emails (can be removed with paid plan)

**Upgrade if:**
- You need more than 200 emails/month
- You want to remove EmailJS branding
- You need advanced features
- You need higher reliability/SLA

**Monitor Usage:**
- Check EmailJS Dashboard → Account → Usage
- Set up email alerts for approaching limits
- Upgrade plan if needed

---

## Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Dashboard](https://dashboard.emailjs.com/admin)
- [EmailJS React Guide](https://www.emailjs.com/docs/examples/reactjs/)
- [Email Template Best Practices](https://www.emailjs.com/docs/user-guide/email-templates/)

---

## Notes for Different Frameworks

### If using Create React App:

- Use `REACT_APP_` prefix instead of `VITE_`
- Access via `process.env.REACT_APP_EMAILJS_PUBLIC_KEY`

### If using Next.js:

- Use `NEXT_PUBLIC_` prefix
- Access via `process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- Can use server-side email sending with EmailJS Node.js SDK

### If using plain JavaScript/HTML:

- Can use EmailJS directly via CDN
- No npm package needed
- Example:
  ```html
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
  <script>
    emailjs.init('YOUR_PUBLIC_KEY');
  </script>
  ```

---

## Security Best Practices

1. **Never commit `.env` files** - They're already in `.gitignore`

2. **Public Key is Safe** - The EmailJS Public Key is designed to be exposed in frontend code. It's not a security risk.

3. **Service Credentials** - Your email service credentials (Gmail/Outlook passwords) are stored securely by EmailJS, not in your code.

4. **Rate Limiting** - EmailJS has built-in rate limiting to prevent abuse.

5. **Template Security** - Don't include sensitive data in email templates that shouldn't be exposed.

6. **Environment-Specific Emails** - Consider using different email addresses for development vs. production:
   ```env
   # Development
   VITE_ADMIN_EMAIL=dev@yourproject.com
   
   # Production
   VITE_ADMIN_EMAIL=admin@yourproject.com
   ```

---

## Common Patterns

### Pattern 1: Non-Blocking Emails (Recommended)

Emails are sent but don't block form submission:

```typescript
// Form submission succeeds even if emails fail
Promise.all([
  sendAdminNotification(emailData),
  sendClientConfirmation(emailData)
]).catch(err => {
  console.warn('Email sending failed (non-critical):', err);
});
```

### Pattern 2: Blocking Emails

Wait for emails to complete before continuing:

```typescript
// Form submission waits for emails
try {
  await Promise.all([
    sendAdminNotification(emailData),
    sendClientConfirmation(emailData)
  ]);
  // Only show success after emails are sent
  setSubmitStatus('success');
} catch (error) {
  // Handle email failure
}
```

### Pattern 3: Single Email

Send only one email:

```typescript
// Just send admin notification
await sendAdminNotification(emailData);
```

---

**Last Updated:** Based on project setup from owlai project  
**EmailJS Package Version:** ^4.4.1  
**EmailJS Free Tier:** 200 emails/month
