import emailjs from '@emailjs/browser';

// Fungsi untuk Contact Me
export const sendContactEmail = async (data) => {
  try {
    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      'template_088hwar', // Template ID Contact Me
      {
        from_name: data.name,
        reply_to: data.email,
        message: data.message,
        to_email: 'leaadeliee17@gmail.com'
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    return { success: true, result };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return { success: false, error };
  }
};