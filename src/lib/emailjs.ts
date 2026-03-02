import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
const EMAILJS_CLIENT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CLIENT_TEMPLATE_ID;

/** Admin notifications go to these addresses. Not overridable via env. */
const ADMIN_EMAILS = [
  'lampostlead@owlaisolutions.com',
  'david@leadandallure.com',
  'george@leadandallure.com',
];

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
    console.warn('Missing:', {
      publicKey: !EMAILJS_PUBLIC_KEY,
      serviceId: !EMAILJS_SERVICE_ID,
      templateId: !EMAILJS_ADMIN_TEMPLATE_ID
    });
    return;
  }

  try {
    // Helper function to normalize empty values to "Not provided"
    const normalizeField = (value: string | undefined): string => {
      if (!value || value.trim() === "") return "Not provided";
      return value.trim();
    };

    const telephoneValue = normalizeField(data.telephone);
    const baseParams = {
      name: data.name || "Not provided",
      email: data.email || "Not provided",
      telephone: telephoneValue,
      company: normalizeField(data.company),
      title: normalizeField(data.title),
      problems: normalizeField(data.problems),
      message: data.message || `New form submission from ${data.name}${data.company && data.company.trim() ? ` at ${data.company}` : ""}${data.problems && data.problems.trim() ? `\n\nProblems they're looking to solve:\n${data.problems}` : ""}`,
      submission_date: new Date().toLocaleString(),
      user_name: data.name || "Not provided",
      user_email: data.email || "Not provided",
      user_telephone: telephoneValue,
      user_company: normalizeField(data.company),
      user_title: normalizeField(data.title),
      user_problems: normalizeField(data.problems),
    };

    const results = await Promise.all(
      ADMIN_EMAILS.map((to_email) =>
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_ADMIN_TEMPLATE_ID, {
          ...baseParams,
          to_email,
        })
      )
    );
    console.log('Admin notification emails sent successfully to:', ADMIN_EMAILS, results);
  } catch (error: any) {
    console.error('Failed to send admin notification:', error);
    console.error('Error details:', {
      status: error?.status,
      text: error?.text,
      message: error?.message
    });
    // Don't throw - we don't want email failures to break form submission
  }
};

export const sendClientConfirmation = async (data: FormSubmissionData): Promise<void> => {
  if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_CLIENT_TEMPLATE_ID) {
    console.warn('EmailJS not configured. Skipping client confirmation.');
    console.warn('Missing:', {
      publicKey: !EMAILJS_PUBLIC_KEY,
      serviceId: !EMAILJS_SERVICE_ID,
      templateId: !EMAILJS_CLIENT_TEMPLATE_ID
    });
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
        from_name: 'OWL AI Team',
        // EmailJS template variables - unified for both forms
        name: data.name,
        email: data.email,
        telephone: data.telephone || "",
        company: data.company || "",
        title: data.title || "",
        submission_date: new Date().toLocaleString(),
        // Also include user_ prefixed versions for backward compatibility
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
    console.error('Error details:', {
      status: error?.status,
      text: error?.text,
      message: error?.message
    });
    // Don't throw - we don't want email failures to break form submission
  }
};

