import nodemailer from "nodemailer";

export async function sendMail(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  const host = (process.env.SMTP_HOST || "").trim();
  if (!host) {
    console.info("[mail] SMTP not configured; skipping send:", options.subject);
    return { skipped: true as const };
  }

  // Guard against misconfigured numeric "hosts" like "465"
  if (/^\d+$/.test(host)) {
    console.warn(
      "[mail] SMTP_HOST looks like a port number; skipping send:",
      host,
    );
    return { skipped: true as const };
  }

  const port = Number(process.env.SMTP_PORT || 587);
  if (!Number.isFinite(port) || port <= 0) {
    console.warn("[mail] Invalid SMTP_PORT; skipping send:", process.env.SMTP_PORT);
    return { skipped: true as const };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
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
  } catch (error) {
    console.error("[mail] Failed to send:", options.subject, error);
    return { skipped: true as const, error: true as const };
  }
}
