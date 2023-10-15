import { MagicLinkEmailTemplate } from '@/components/emails/MagicLinkEmailTemplate';
import { Resend } from 'resend';
import { Theme } from 'next-auth';
import { EmailConfig } from 'next-auth/providers/email';

export interface SendVerificationRequestParams {
  identifier: string;
  url: string;
  expires: Date;
  provider: EmailConfig;
  token: string;
  theme: Theme;
}

export async function sendVerificationRequest(params: SendVerificationRequestParams) {
  const { identifier, url } = params;
  const { host } = new URL(url);
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [identifier],
      subject: `Log in to ${host} via magic link`,
      text: text({ url, host }),
      react: MagicLinkEmailTemplate({ host: host, url: url, userEmail: identifier })
    });
  } catch (error) {
    throw new Error('Something went wrong when sending the login email. Please try again.');
  }
}

function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host} by clicking the magic link below.\n${url}\n\nIf you did not mean to login then ignore this email.`;
}
