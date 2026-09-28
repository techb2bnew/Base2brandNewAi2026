// Field/step configuration for the Client Onboarding form.
// Edit this file to add, remove or change questions — the form UI, step
// progress and validation all read from this config, nothing is hardcoded
// in the components.
//
// Field shape:
//   {
//     name: "fieldName",       // key used in formData + the email
//     label: "Question label",
//     type: "text" | "email" | "tel" | "url" | "textarea" | "select" | "checkboxGroup" | "file",
//     required: true | false,
//     placeholder: "...",       // optional
//     options: ["A", "B"],      // required for "select" and "checkboxGroup"
//   }

export const ONBOARDING_STEPS = [
  {
    id: "business",
    title: "Business Details",
    heading: "Tell us about your business",
    subtitle: "The basics — who you are and where you operate.",
    fields: [
      {
        name: "businessName",
        label: "Business / Company Name",
        type: "text",
        required: false,
        placeholder: "Acme Inc.",
      },
      {
        name: "website",
        label: "Website",
        type: "url",
        required: false,
        placeholder: "https://yourcompany.com",
      },
      {
        name: "industry",
        label: "Industry",
        type: "text",
        required: false,
        placeholder: "e.g. Ecommerce, SaaS, Healthcare",
      },
      {
        name: "location",
        label: "Business Location",
        type: "text",
        required: false,
        placeholder: "City, Country",
      },
      {
        name: "companySize",
        label: "Company Size",
        type: "select",
        required: false,
        options: ["1-10", "11-50", "51-200", "201-500", "500+"],
      },
    ],
  },
  {
    id: "contact",
    title: "Contact Details",
    heading: "Who should we be in touch with?",
    subtitle: "The main point of contact for this project.",
    fields: [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        required: false,
        placeholder: "Jane Doe",
      },
      {
        name: "jobTitle",
        label: "Job Title",
        type: "text",
        required: false,
        placeholder: "Marketing Director",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: false,
        placeholder: "you@company.com",
      },
      {
        name: "phone",
        label: "Phone / WhatsApp",
        type: "tel",
        required: false,
        placeholder: "+91 98765 43210",
      },
    ],
  },
  {
    id: "project",
    title: "Project Requirements",
    heading: "What do you need help with?",
    subtitle: "Give us a picture of the project scope.",
    fields: [
      {
        name: "servicesRequired",
        label: "Services Required",
        type: "checkboxGroup",
        required: false,
        options: [
          "Website Design & Development",
          "SEO / Growth Visibility",
          "Performance Marketing",
          "AI Automation",
          "Shopify & Ecommerce",
          "Branding & Creative",
          "Enterprise Systems",
          "Other",
        ],
      },
      {
        name: "currentWebsite",
        label: "Current Website (if any)",
        type: "url",
        required: false,
        placeholder: "https://",
      },
      {
        name: "existingPlatforms",
        label: "Existing Platforms / Tools",
        type: "text",
        required: false,
        placeholder: "e.g. Shopify, HubSpot, Salesforce",
      },
      {
        name: "targetAudience",
        label: "Target Audience",
        type: "textarea",
        required: false,
        placeholder: "Who are you trying to reach?",
      },
      {
        name: "projectDescription",
        label: "Project Description",
        type: "textarea",
        required: false,
        placeholder: "Tell us what you're looking to build or improve...",
      },
    ],
  },
  {
    id: "goals",
    title: "Goals & Preferences",
    heading: "What does success look like?",
    subtitle: "Helps us prioritize the right things first.",
    fields: [
      {
        name: "primaryGoal",
        label: "Primary Goal",
        type: "text",
        required: false,
        placeholder: "e.g. More qualified leads",
      },
      {
        name: "targetMarket",
        label: "Target Market",
        type: "text",
        required: false,
        placeholder: "e.g. India, US, Global",
      },
      {
        name: "expectedOutcome",
        label: "Expected Outcome",
        type: "textarea",
        required: false,
        placeholder: "What result would make this a success?",
      },
      {
        name: "budgetRange",
        label: "Budget Range",
        type: "select",
        required: false,
        options: [
          "Under $2,000",
          "$2,000 - $5,000",
          "$5,000 - $10,000",
          "$10,000 - $25,000",
          "$25,000+",
        ],
      },
      {
        name: "timeline",
        label: "Timeline",
        type: "select",
        required: false,
        options: [
          "ASAP",
          "Within 1 month",
          "1-3 months",
          "3-6 months",
          "Flexible",
        ],
      },
      {
        name: "additionalNotes",
        label: "Additional Notes",
        type: "textarea",
        required: false,
        placeholder: "Anything else we should know?",
      },
      {
        name: "attachment",
        label: "Upload Document (optional)",
        type: "file",
        required: false,
      },
    ],
  },
  {
    id: "confirmation",
    title: "Confirmation",
    heading: "Review & submit",
    subtitle: "Take a look before you send this to our team.",
    fields: [],
  },
];
