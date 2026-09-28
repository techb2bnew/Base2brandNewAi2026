import { ONBOARDING_STEPS } from "@/components/client-onboarding/formConfig";
import { sendOnboardingNotification } from "@/lib/email/onboardingEmail";

export const runtime = "nodejs";

const DATA_STEPS = ONBOARDING_STEPS.filter((step) => step.fields.length > 0);
const ALL_FIELDS = DATA_STEPS.flatMap((step) => step.fields);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_TEXT_LENGTH = 500;
const MAX_TEXTAREA_LENGTH = 5000;
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB

function sanitizeText(value, maxLength) {
  return String(value ?? "").trim().slice(0, maxLength);
}

export async function POST(request) {
  try {
    const submitted = await request.formData();
    const formData = {};
    const errors = {};
    let attachment = null;

    for (const field of ALL_FIELDS) {
      if (field.type === "file") {
        const file = submitted.get(field.name);

        if (file && typeof file === "object" && file.size > 0) {
          if (file.size > MAX_FILE_BYTES) {
            errors[field.name] = "File is too large (max 10MB).";
          } else {
            const buffer = Buffer.from(await file.arrayBuffer());
            attachment = { name: file.name, buffer };
            formData[field.name] = file.name;
          }
        } else if (field.required) {
          errors[field.name] = "This field is required.";
        }
        continue;
      }

      if (field.type === "checkboxGroup") {
        let list = [];
        try {
          list = JSON.parse(submitted.get(field.name) || "[]");
        } catch {
          list = [];
        }
        list = Array.isArray(list) ? list.filter((item) => typeof item === "string") : [];

        if (field.required && list.length === 0) {
          errors[field.name] = "Select at least one option.";
        }

        formData[field.name] = list;
        continue;
      }

      const maxLength =
        field.type === "textarea" ? MAX_TEXTAREA_LENGTH : MAX_TEXT_LENGTH;
      const value = sanitizeText(submitted.get(field.name), maxLength);

      if (field.required && !value) {
        errors[field.name] = "This field is required.";
      }

      if (field.type === "email" && value && !EMAIL_RE.test(value)) {
        errors[field.name] = "Enter a valid email address.";
      }

      formData[field.name] = value;
    }

    if (Object.keys(errors).length > 0) {
      return Response.json(
        { success: false, error: "Some required fields are missing or invalid.", fields: errors },
        { status: 400 },
      );
    }

    await sendOnboardingNotification({ formData, attachment });

    return Response.json({
      success: true,
      message: "Thanks! Your onboarding details have been submitted.",
    });
  } catch (error) {
    console.error("Client onboarding submission error:", error?.message || error);

    return Response.json(
      {
        success: false,
        error:
          error?.message ||
          "Unable to submit your details right now. Please try again.",
      },
      { status: 500 },
    );
  }
}
