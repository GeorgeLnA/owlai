# EmailJS Setup Instructions

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Sign up for a free account (or log in if you already have one)
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection instructions for your provider
5. Give your service a name (e.g., "OWL AI Contact Form")
6. Note your **Service ID** (you'll need this later)

## Step 3: Create Email Templates

### Template 1: Admin Notification

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Name it: "Admin Notification - OWL AI"
4. Set the **Subject**: `New Contact Form Submission - OWL AI`
5. Set **To Email**: Your admin email address (e.g., `admin@owlai.com`)
6. Set **From Name**: `OWL AI Contact Form`
7. Set **From Email**: Your service email (or use EmailJS default)
8. In the **Content** section, click **Code Editor** (HTML mode)
9. Copy and paste the content from `email-templates/admin-notification.html`
10. Replace the template variables with EmailJS syntax:
    - `{{user_name}}` → `{{user_name}}`
    - `{{user_email}}` → `{{user_email}}`
    - `{{user_telephone}}` → `{{user_telephone}}`
    - `{{submission_date}}` → `{{submission_date}}`
11. Click **Save**
12. Note your **Template ID** (you'll need this later)

### Template 2: Client Confirmation

1. Create another template: **Create New Template**
2. Name it: "Client Confirmation - OWL AI"
3. Set the **Subject**: `Thank You for Contacting OWL AI`
4. Set **To Email**: `{{user_email}}` (dynamic - will use form submitter's email)
5. Set **From Name**: `OWL AI Team`
6. Set **From Email**: Your service email
7. In the **Content** section, click **Code Editor** (HTML mode)
8. Copy and paste the content from `email-templates/client-confirmation.html`
9. The template variables are already in the correct format
10. Click **Save**
11. Note your **Template ID** (you'll need this later)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in EmailJS dashboard
2. Find your **Public Key** (also called API Key)
3. Copy this key (you'll need it for the `.env` file)

## Step 5: Configure Environment Variables

Add these variables to your `.env` file:

```env
# EmailJS Configuration
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_ADMIN_TEMPLATE_ID=your_admin_template_id_here
VITE_EMAILJS_CLIENT_TEMPLATE_ID=your_client_template_id_here
VITE_ADMIN_EMAIL=admin@owlai.com
```

Replace:
- `your_public_key_here` with your EmailJS Public Key from Step 4
- `your_service_id_here` with your Service ID from Step 2
- `your_admin_template_id_here` with Admin Template ID from Step 3
- `your_client_template_id_here` with Client Template ID from Step 3
- `admin@owlai.com` with your actual admin email address

## Step 6: Test the Integration

1. Restart your dev server: `npm run dev`
2. Fill out and submit the contact form
3. Check:
   - Your admin email for the notification
   - The submitter's email for the confirmation
   - Browser console for any errors

## Template Variables Reference

The templates use these variables that are automatically passed:

### Admin Notification Template:
- `{{user_name}}` - Submitter's name
- `{{user_email}}` - Submitter's email
- `{{user_telephone}}` - Submitter's telephone
- `{{submission_date}}` - Date/time of submission

### Client Confirmation Template:
- `{{user_name}}` - Submitter's name
- `{{user_email}}` - Submitter's email
- `{{user_telephone}}` - Submitter's telephone
- `{{submission_date}}` - Date/time of submission

## Troubleshooting

### Emails not sending
- Verify all environment variables are set correctly
- Check EmailJS dashboard for error logs
- Ensure your email service is properly connected
- Check browser console for JavaScript errors

### Template variables not working
- Make sure variable names match exactly (case-sensitive)
- Verify variables are passed in the `emailjs.ts` file
- Check EmailJS template editor shows variables correctly

### Free tier limitations
- EmailJS free tier allows 200 emails/month
- Consider upgrading if you expect more submissions
- Monitor usage in EmailJS dashboard

## Security Notes

- Never commit your `.env` file to git (already in `.gitignore`)
- The Public Key is safe to expose in frontend code (it's public)
- Keep your email service credentials secure
- Consider using environment-specific email addresses for dev/prod

