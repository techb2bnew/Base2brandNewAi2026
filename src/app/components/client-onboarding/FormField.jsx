"use client";

import { ChevronDown, Paperclip } from "lucide-react";

export const inputBase =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 md:py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/35 focus:border-[var(--b2b-primary)] focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--b2b-primary)_16%,transparent)]";

function FieldWrapper({ field, error, children }) {
  return (
    <div>
      <label
        htmlFor={field.name}
        className="mb-2 block text-sm font-medium text-white/75"
      >
        {field.label}
        {field.required && <span className="text-[var(--b2b-primary)]"> *</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default function FormField({ field, value, onChange, error }) {
  const errorClass = error ? "border-red-500/50" : "";

  if (field.type === "textarea") {
    return (
      <FieldWrapper field={field} error={error}>
        <textarea
          id={field.name}
          name={field.name}
          value={value ?? ""}
          onChange={(e) => onChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          rows={4}
          className={`${inputBase} ${errorClass} min-h-28 resize-none`}
        />
      </FieldWrapper>
    );
  }

  if (field.type === "select") {
    return (
      <FieldWrapper field={field} error={error}>
        <div className="relative">
          <select
            id={field.name}
            name={field.name}
            value={value ?? ""}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={`${inputBase} ${errorClass} appearance-none pr-12`}
          >
            <option value="" className="bg-[#05070D]">
              Select an option
            </option>
            {field.options.map((option) => (
              <option key={option} value={option} className="bg-[#05070D]">
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
        </div>
      </FieldWrapper>
    );
  }

  if (field.type === "checkboxGroup") {
    const selected = Array.isArray(value) ? value : [];

    const toggle = (option) => {
      const next = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option];
      onChange(field.name, next);
    };

    return (
      <FieldWrapper field={field} error={error}>
        <div
          className={`grid gap-2 sm:grid-cols-2 ${
            error ? "rounded-2xl border border-red-500/50 p-3" : ""
          }`}
        >
          {field.options.map((option) => {
            const checked = selected.includes(option);
            return (
              <label
                key={option}
                className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm transition-all ${
                  checked
                    ? "border-[var(--b2b-primary)] bg-[color-mix(in_srgb,var(--b2b-primary)_14%,transparent)] text-white"
                    : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/20"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(option)}
                  className="h-4 w-4 shrink-0 accent-[var(--b2b-primary)]"
                />
                {option}
              </label>
            );
          })}
        </div>
      </FieldWrapper>
    );
  }

  if (field.type === "file") {
    return (
      <FieldWrapper field={field} error={error}>
        <label
          htmlFor={field.name}
          className={`flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed px-4 py-3.5 text-sm transition-all ${
            error
              ? "border-red-500/50 text-red-300"
              : "border-white/15 text-white/60 hover:border-white/25"
          }`}
        >
          <Paperclip className="h-4 w-4 shrink-0" />
          {value?.name || "Choose a file"}
        </label>
        <input
          id={field.name}
          name={field.name}
          type="file"
          onChange={(e) => onChange(field.name, e.target.files?.[0] || null)}
          className="sr-only"
        />
      </FieldWrapper>
    );
  }

  // text / email / tel / url
  return (
    <FieldWrapper field={field} error={error}>
      <input
        id={field.name}
        name={field.name}
        type={field.type}
        value={value ?? ""}
        onChange={(e) => onChange(field.name, e.target.value)}
        placeholder={field.placeholder}
        className={`${inputBase} ${errorClass}`}
      />
    </FieldWrapper>
  );
}
