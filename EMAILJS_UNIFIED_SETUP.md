# Unified EmailJS Setup for Both Forms

## Overview

Both forms ("Get in Touch" and "Request a Free Demo") use the **same EmailJS templates**:
- **Admin Template:** `template_y0y39zw` → Sends to `arseniy.morozov.2004@gmail.com`
- **Client Template:** `template_497md7m` → Sends to submitter's email

## EmailJS Configuration

### Environment Variables (already set in `.env`):
```env
VITE_EMAILJS_PUBLIC_KEY=j0u-vBDMa2S6oe_6B
VITE_EMAILJS_SERVICE_ID=service_ypr964s
VITE_EMAILJS_ADMIN_TEMPLATE_ID=template_y0y39zw
VITE_EMAILJS_CLIENT_TEMPLATE_ID=template_497md7m
VITE_ADMIN_EMAIL=arseniy.morozov.2004@gmail.com
```

## Template Setup Instructions

### Template 1: Admin Notification (`template_y0y39zw`)

**Settings:**
- **To Email:** `arseniy.morozov.2004@gmail.com` (fixed email)
- **To Name:** `Admin` or `OWL AI Team`
- **From Name:** `OWL AI Contact Form`
- **Reply To:** `{{email}}` (submitter's email)

**Template Variables Available:**
- `{{name}}` - Submitter's name
- `{{email}}` - Submitter's email
- `{{telephone}}` - Phone number
- `{{company}}` - Company name (may be "Not provided" for Get in Touch form)
- `{{title}}` - Job title (may be "Not provided" for Get in Touch form)
- `{{submission_date}}` - Date/time of submission

**Template HTML:** Use `email-templates/admin-notification.html`

---

### Template 2: Client Confirmation (`template_497md7m`)

**Settings:**
- **To Email:** `{{email}}` ⚠️ **MUST use variable, not fixed email**
- **To Name:** `{{name}}`
- **From Name:** `OWL AI Team`
- **Reply To:** Your admin email or `{{email}}`

**Template Variables Available:**
- `{{name}}` - Submitter's name
- `{{email}}` - Submitter's email
- `{{telephone}}` - Phone number (may be empty)
- `{{company}}` - Company name (may be empty)
- `{{title}}` - Job title (may be empty)
- `{{submission_date}}` - Date/time of submission

**Template HTML:** Use `email-templates/client-confirmation.html`

---

## Form Data Mapping

### Get in Touch Form:
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  telephone: "+1234567890",
  company: "", // Empty
  title: ""    // Empty
}
```

### Request a Demo Form:
```javascript
{
  name: "Jane Smith",
  email: "jane@example.com",
  telephone: "+1234567890" or "Not provided",
  company: "Acme Corp",
  title: "CEO" or "Not provided"
}
```

Both forms send the same structure, just with different data.

---

## Troubleshooting Demo Form Not Sending Emails

### Issue: Demo form redirects before emails are sent

**Solution:** The code now waits for emails to complete before redirecting. If you still have issues:

1. **Check Browser Console:**
   - Open Developer Tools (F12) → Console
   - Submit the demo form
   - Look for:
     - `Sending admin notification email to: arseniy.morozov.2004@gmail.com`
     - `Sending client confirmation email to: [email]`
     - `All emails sent successfully`
     - Or error messages

2. **Check EmailJS Logs:**
   - Go to EmailJS Dashboard → Logs
   - Look for recent attempts from demo form submissions
   - Check for errors

3. **Verify Template Settings:**
   - Admin template (`template_y0y39zw`): "To Email" = `arseniy.morozov.2004@gmail.com`
   - Client template (`template_497md7m`): "To Email" = `{{email}}`

4. **Test Both Templates:**
   - Use EmailJS dashboard "Test" button
   - Fill in test data
   - Verify emails are received

---

## Quick Verification Checklist

### Admin Template (`template_y0y39zw`):
- [ ] Template ID matches: `template_y0y39zw`
- [ ] "To Email" = `arseniy.morozov.2004@gmail.com`
- [ ] "Reply To" = `{{email}}`
- [ ] Template HTML includes all variables
- [ ] Test email works

### Client Template (`template_497md7m`):
- [ ] Template ID matches: `template_497md7m`
- [ ] "To Email" = `{{email}}` ⚠️ **Critical - must be variable**
- [ ] "To Name" = `{{name}}`
- [ ] Template HTML includes all variables
- [ ] Test email works

### Both Forms:
- [ ] Get in Touch form sends emails ✅ (working)
- [ ] Request a Demo form sends emails (check console/logs)
- [ ] Browser console shows email sending logs
- [ ] EmailJS logs show successful sends

---

## Common Issues

### Issue 1: Client template not sending emails
**Cause:** "To Email" field is set to fixed address instead of `{{email}}`
**Fix:** Change "To Email" to `{{email}}` in template settings

### Issue 2: Admin template not receiving emails
**Cause:** "To Email" field is wrong or email service not verified
**Fix:** Set "To Email" to `arseniy.morozov.2004@gmail.com` and verify email service

### Issue 3: Demo form redirects too quickly
**Cause:** Form redirects before emails are sent
**Fix:** Code now waits for emails (already fixed)

### Issue 4: Emails in spam
**Cause:** Email service not properly verified
**Fix:** Verify email service connection in EmailJS dashboard

---

## Testing

1. **Test Get in Touch Form:**
   - Submit form
   - Check console for email logs
   - Verify admin email received
   - Verify client email received

2. **Test Request a Demo Form:**
   - Submit form
   - Check console for email logs
   - Verify admin email received
   - Verify client email received
   - Check that redirect happens after emails

3. **Test in EmailJS Dashboard:**
   - Use "Test" button in both templates
   - Verify test emails are received
   - Check that variables are populated correctly

---

## Need Help?

If emails still don't work:
1. Check browser console for detailed error messages
2. Check EmailJS dashboard logs
3. Verify all environment variables are correct
4. Test templates directly in EmailJS dashboard
5. Check spam folders
6. Verify email service is connected and verified

