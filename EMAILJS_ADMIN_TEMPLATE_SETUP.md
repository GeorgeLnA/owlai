# EmailJS Admin Template Setup Guide

## Issue: Not Receiving Admin Notification Emails

If you're not receiving admin notification emails when forms are submitted, follow these steps to configure your EmailJS template correctly.

## Step 1: Check Your EmailJS Template Settings

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/admin)
2. Navigate to **Email Templates**
3. Find your admin notification template: **template_y0y39zw**
4. Click to edit it

## Step 2: Configure Template Settings

### Critical Settings:

1. **To Email Field:**
   - Must be set to: `arseniy.morozov.2004@gmail.com` (your admin email)
   - OR use: `{{to_email}}` if you want to make it dynamic
   - ⚠️ **This must be a valid email address where you want to receive notifications**

2. **To Name Field:**
   - Set to: `Admin` or `OWL AI Team` (or any name you prefer)
   - This is optional but recommended

3. **From Name:**
   - Set to: `OWL AI Contact Form` (or any name you prefer)

4. **From Email:**
   - This should be your service email (the one connected to your EmailJS service)
   - Make sure it's verified in your email service settings

5. **Reply To:**
   - Set to: `{{email}}` (so replies go to the submitter)
   - This allows you to reply directly to the person who submitted the form

## Step 3: Verify Template Variables

Make sure your template HTML includes these variables:

- `{{name}}` - Submitter's name
- `{{email}}` - Submitter's email (use this in Reply To)
- `{{telephone}}` - Phone number
- `{{company}}` - Company name (may show "Not provided" if empty)
- `{{title}}` - Job title (may show "Not provided" if empty)
- `{{submission_date}}` - Date/time of submission

## Step 4: Test the Template

1. In EmailJS template editor, click **Test** button
2. Fill in test values:
   - `name`: Test User
   - `email`: test-submitter@example.com
   - `telephone`: +1234567890
   - `company`: Test Company
   - `title`: Test Title
   - `submission_date`: 2024-01-13 12:00 PM
3. Click **Send Test Email**
4. Check if you receive the test email at `arseniy.morozov.2004@gmail.com`

## Step 5: Check Browser Console

1. Open your website
2. Open browser Developer Tools (F12)
3. Go to **Console** tab
4. Submit either form (Get in Touch or Request a Demo)
5. Look for these messages:
   - ✅ `Sending admin notification email to: arseniy.morozov.2004@gmail.com` - Email is being sent
   - ✅ `Admin notification email sent successfully` - Email was sent successfully
   - ❌ `Failed to send admin notification` - There's an error (check error details)

## Step 6: Check EmailJS Logs

1. Go to EmailJS Dashboard → **Logs**
2. Look for recent email attempts
3. Check for any errors or failures
4. Common issues:
   - **Invalid email address** - Check if admin email is correct
   - **Service not connected** - Verify your email service is properly connected
   - **Template not found** - Verify template ID matches `template_y0y39zw`

## Common Issues and Solutions

### Issue 1: "To Email" is not set correctly
**Solution:** 
- Set it to: `arseniy.morozov.2004@gmail.com`
- Or verify the email in your `.env` file matches: `VITE_ADMIN_EMAIL=arseniy.morozov.2004@gmail.com`

### Issue 2: Email service not verified
**Solution:** 
- Go to Email Services in EmailJS
- Verify your email service connection
- Re-authenticate if needed

### Issue 3: Template variables not matching
**Solution:**
- Make sure variable names match exactly (case-sensitive)
- Use: `{{name}}`, `{{email}}`, `{{telephone}}`, `{{company}}`, `{{title}}`, etc.

### Issue 4: Emails going to spam
**Solution:**
- Check spam/junk folder in `arseniy.morozov.2004@gmail.com`
- Verify your "From Email" is properly configured
- Consider using a verified domain email

### Issue 5: Reply To not working
**Solution:**
- Set "Reply To" field to `{{email}}` in template settings
- This allows you to reply directly to the submitter

## Quick Checklist

- [ ] Template ID is `template_y0y39zw`
- [ ] "To Email" field is set to `arseniy.morozov.2004@gmail.com`
- [ ] "Reply To" field uses `{{email}}` variable
- [ ] Email service is connected and verified
- [ ] Template HTML includes all variables: `{{name}}`, `{{email}}`, `{{telephone}}`, `{{company}}`, `{{title}}`
- [ ] Test email works in EmailJS dashboard
- [ ] Browser console shows email being sent
- [ ] Check EmailJS logs for errors
- [ ] Check spam folder if emails not received

## Environment Variables

Make sure your `.env` file has:
```env
VITE_EMAILJS_PUBLIC_KEY=j0u-vBDMa2S6oe_6B
VITE_EMAILJS_SERVICE_ID=service_ypr964s
VITE_EMAILJS_ADMIN_TEMPLATE_ID=template_y0y39zw
VITE_ADMIN_EMAIL=arseniy.morozov.2004@gmail.com
```

## Still Not Working?

1. Check browser console for detailed error messages
2. Check EmailJS dashboard logs
3. Verify all environment variables in `.env` file
4. Restart your dev server after changing `.env` file
5. Try sending a test email directly from EmailJS dashboard
6. Check spam/junk folder in your Gmail account
7. Verify your email service (Gmail/Outlook) is properly connected in EmailJS

## Testing Both Forms

Both forms should send admin notifications:
- **Get in Touch form** → Sends admin notification
- **Request a Demo form** → Sends admin notification

Both use the same admin template (`template_y0y39zw`) and send to the same email (`arseniy.morozov.2004@gmail.com`).

