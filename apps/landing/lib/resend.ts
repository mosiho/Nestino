import { Resend } from "resend";

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function sendTrialEmails(params: {
  toOwner: string;
  ownerName: string;
  demoUrl: string;
  subdomain: string;
  internalTo: string;
}): Promise<void> {
  const resend = getClient();
  if (!resend) return;

  const { toOwner, ownerName, demoUrl, subdomain, internalTo } = params;

  const from =
    process.env.RESEND_FROM_EMAIL ?? "Nestino <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to: internalTo,
    subject: `New trial: ${subdomain}`,
    text: `New trial activation\nProperty: ${ownerName}\nEmail: ${toOwner}\nDemo: ${demoUrl}`,
  });

  await resend.emails.send({
    from,
    to: toOwner,
    subject: "You're in — your Nestino trial is starting",
    text: `Hi,\n\nThanks for activating your Nestino trial.\n\nYour demo site: ${demoUrl}\n\nWe'll follow up shortly with next steps.\n\n— Nestino`,
  });
}
