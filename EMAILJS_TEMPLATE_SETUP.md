# EmailJS Template Setup Guide for Demo Form

## Issue: Not Receiving Client Confirmation Emails

If you're not receiving emails when submitting the "Request a Free Demo" form, follow these steps to configure your EmailJS template correctly.

## Step 1: Check Your EmailJS Template Settings

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/admin)
2. Navigate to **Email Templates**
3. Find your client confirmation template: **template_497md7m**
4. Click to edit it

## Step 2: Configure Template Settings

### Critical Settings:

1. **To Email Field:**
   - Must be set to: `{{email}}` (NOT a fixed email address)
   - This is the submitter's email address
   - ⚠️ **This is the most common issue!**

2. **To Name Field:**
   - Set to: `{{name}}`
   - This personalizes the email

3. **From Name:**
   - Set to: `OWL AI Team` (or any name you prefer)

4. **From Email:**
   - This should be your service email (the one connected to your EmailJS service)
   - Make sure it's verified in your email service settings

5. **Reply To:**
   - Set to: `{{email}}` (so replies go to the submitter)
   - OR set to your admin email if you want replies to come to you

## Step 3: Verify Template Variables

Make sure your template HTML includes these variables:

- `{{name}}` - Submitter's name
- `{{email}}` - Submitter's email
- `{{telephone}}` - Phone number (may be empty)
- `{{company}}` - Company name (may be empty)
- `{{title}}` - Job title (may be empty)
- `{{submission_date}}` - Date/time of submission

## Step 4: Test the Template

1. In EmailJS template editor, click **Test** button
2. Fill in test values:
   - `name`: Test User
   - `email`: your-test-email@example.com
   - `telephone`: +1234567890
   - `company`: Test Company
   - `title`: Test Title
   - `submission_date`: 2024-01-13 12:00 PM
3. Click **Send Test Email**
4. Check if you receive the test email

## Step 5: Check Browser Console

1. Open your website
2. Open browser Developer Tools (F12)
3. Go to **Console** tab
4. Submit the demo form
5. Look for these messages:
   - ✅ `Sending client confirmation email to: [email]` - Email is being sent
   - ✅ `Client confirmation email sent successfully` - Email was sent successfully
   - ❌ `Failed to send client confirmation` - There's an error (check error details)

## Step 6: Check EmailJS Logs

1. Go to EmailJS Dashboard → **Logs**
2. Look for recent email attempts
3. Check for any errors or failures
4. Common issues:
   - **Invalid email address** - Check if `{{email}}` variable is set correctly
   - **Service not connected** - Verify your email service is properly connected
   - **Template not found** - Verify template ID matches `template_497md7m`

## Common Issues and Solutions

### Issue 1: "To Email" is set to a fixed address
**Solution:** Change it to `{{email}}` variable

### Issue 2: Email service not verified
**Solution:** 
- Go to Email Services in EmailJS
- Verify your email service connection
- Re-authenticate if needed

### Issue 3: Template variables not matching
**Solution:**
- Make sure variable names match exactly (case-sensitive)
- Use: `{{name}}`, `{{email}}`, `{{telephone}}`, etc.

### Issue 4: Emails going to spam
**Solution:**
- Check spam/junk folder
- Verify your "From Email" is properly configured
- Consider using a verified domain email

## Quick Checklist

- [ ] Template ID is `template_497md7m`
- [ ] "To Email" field uses `{{email}}` variable
- [ ] "To Name" field uses `{{name}}` variable
- [ ] Email service is connected and verified
- [ ] Template HTML includes all variables
- [ ] Test email works in EmailJS dashboard
- [ ] Browser console shows email being sent
- [ ] Check EmailJS logs for errors

## Still Not Working?

1. Check browser console for detailed error messages
2. Check EmailJS dashboard logs
3. Verify all environment variables in `.env` file:
   ```
   VITE_EMAILJS_PUBLIC_KEY=j0u-vBDMa2S6oe_6B
   VITE_EMAILJS_SERVICE_ID=service_ypr964s
   VITE_EMAILJS_CLIENT_TEMPLATE_ID=template_497md7m
   ```
4. Restart your dev server after changing `.env` file
5. Try sending a test email directly from EmailJS dashboard

