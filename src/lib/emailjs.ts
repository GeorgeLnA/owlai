import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
const EMAILJS_CLIENT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CLIENT_TEMPLATE_ID;
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@owlai.com';

// Initialize EmailJS
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

export interface FormSubmissionData {
  name: string;
  email: string;
  telephone: string;
}

export const sendAdminNotification = async (data: FormSubmissionData): Promise<void> => {
  if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_ADMIN_TEMPLATE_ID) {
    console.warn('EmailJS not configured. Skipping admin notification.');
    return;
  }

  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_ADMIN_TEMPLATE_ID,
      {
        to_email: ADMIN_EMAIL,
        // EmailJS template variables - matching your template
        name: data.name,
        email: data.email,
        telephone: data.telephone,
        message: `New form submission from ${data.name}`,
        submission_date: new Date().toLocaleString(),
        // Also include user_ prefixed versions for backward compatibility
        user_name: data.name,
        user_email: data.email,
        user_telephone: data.telephone,
      }
    );
  } catch (error) {
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
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_CLIENT_TEMPLATE_ID,
      {
        to_email: data.email,
        to_name: data.name,
        from_name: 'OWL AI Team',
        // EmailJS template variables - matching your template
        name: data.name,
        email: data.email,
        telephone: data.telephone,
        submission_date: new Date().toLocaleString(),
        // Also include user_ prefixed versions for backward compatibility
        user_name: data.name,
        user_email: data.email,
        user_telephone: data.telephone,
      }
    );
  } catch (error) {
    console.error('Failed to send client confirmation:', error);
    // Don't throw - we don't want email failures to break form submission
  }
};

