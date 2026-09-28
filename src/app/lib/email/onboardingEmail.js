import nodemailer from "nodemailer";
import { ONBOARDING_STEPS } from "@/components/client-onboarding/formConfig";

const DATA_STEPS = ONBOARDING_STEPS.filter((step) => step.fields.length > 0);

function normalizeSmtpPass(pass) {
  return String(pass || "").replace(/[\s-]/g, "");
}

function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = normalizeSmtpPass(process.env.SMTP_PASS);

  if (!user || !pass) {
    throw new Error("SMTP credentials are missing.");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

function getFromAddress() {
  return (
    process.env.SMTP_FROM?.replace(/^["']|["']$/g, "") ||
    process.env.SMTP_USER
  );
}

function getAdminRecipients() {
  const raw = process.env.MAIN_ENQUIRY_RECIPIENTS || process.env.SMTP_USER || "";

  return [...new Set(raw.split(",").map((email) => email.trim()).filter(Boolean))];
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatFieldValue(field, rawValue) {
  if (field.type === "checkboxGroup") {
    let list = rawValue;
    if (typeof rawValue === "string") {
      try {
        list = JSON.parse(rawValue);
      } catch {
        list = [];
      }
    }
    return Array.isArray(list) && list.length ? list.join(", ") : "";
  }

  return String(rawValue ?? "").trim();
}

function buildSectionHtml(step, formData) {
  const rows = step.fields
    .filter((field) => field.type !== "file")
    .map((field) => ({ label: field.label, value: formatFieldValue(field, formData[field.name]) }))
    .filter((row) => row.value);

  if (!rows.length) return "";

  const rowsHtml = rows
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding:6px 12px 6px 0;font-size:13px;color:#6b7280;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:6px 0;font-size:14px;color:#111827;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `
    <tr>
      <td style="padding:20px 32px 4px;">
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#ff6a00;">${escapeHtml(step.title)}</p>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rowsHtml}</table>
      </td>
    </tr>`;
}

function buildOnboardingEmailHtml(formData) {
  const sections = DATA_STEPS.map((step) => buildSectionHtml(step, formData)).join("");

  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#eef2f7;font-family:Arial,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:20px;overflow:hidden;">
            <tr>
              <td style="background:linear-gradient(135deg,#05070D,#111827);padding:28px 32px;">
                <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#ff6a00;">Base2Brand</p>
                <h1 style="margin:0;font-size:24px;color:#ffffff;">New Client Onboarding Submission</h1>
              </td>
            </tr>
            ${sections}
            <tr>
              <td style="padding:20px 32px 28px;">
                <p style="margin:0;font-size:12px;color:#9ca3af;">Submitted via the client onboarding form on base2brand.com.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

export async function sendOnboardingNotification({ formData, attachment }) {
  const transporter = getTransporter();
  const recipients = getAdminRecipients();

  if (!recipients.length) {
    throw new Error("No recipient configured for onboarding notifications.");
  }

  const businessName = String(formData.businessName || "").trim();
  const html = buildOnboardingEmailHtml(formData);

  const attachments = attachment
    ? [{ filename: attachment.name, content: attachment.buffer }]
    : [];

  const info = await transporter.sendMail({
    from: getFromAddress(),
    to: recipients,
    subject: `[ONBOARDING] New Client — ${businessName || "Untitled"}`,
    html,
    text: html.replace(/<[^>]+>/g, " "),
    attachments,
  });

  console.info("Onboarding notification sent", {
    to: recipients,
    messageId: info.messageId,
    accepted: info.accepted,
  });
}
