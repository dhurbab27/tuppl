import nodemailer from "nodemailer";

export async function sendMail(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  const host = process.env.SMTP_HOST;
  if (!host) {
    console.info("[mail] SMTP not configured; skipping send:", options.subject);
    return { skipped: true as const };
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || "Tuppl <noreply@tuppl.com>",
    ...options,
  });

  return { skipped: false as const };
}
