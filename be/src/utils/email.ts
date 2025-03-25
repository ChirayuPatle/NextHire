import nodemailer from 'nodemailer';
import { env } from '../configs/env-config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}): Promise<void> => {
  try {
    await transporter.sendMail({
      from: `"NextHire" <${env.EMAIL_USER}>`,
      to,
      subject,
      text: text || html,
      html,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
