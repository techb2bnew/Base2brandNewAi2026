import { useRef } from "react";
import { Plus, X, MousePointerClick, RotateCcw, Upload, Image as ImageIcon, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1 MB

function SingleImageField({ label, value, onChange }) {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_IMAGE_SIZE) {
            toast.error(`"${file.name}" exceeds 1MB limit. Please select an image under 1MB.`);
            if (fileInputRef.current) fileInputRef.current.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            onChange(reader.result);
            toast.success("Image selected (will upload to Cloudinary when page is saved)");
        };
        reader.readAsDataURL(file);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const isLocalDataUri = typeof value === "string" && value.startsWith("data:image/");

    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <Label className="text-xs text-neutral-400">{label}</Label>
                {isLocalDataUri && (
                    <span className="text-[10px] text-amber-400/90 font-mono">
                        ● Upload on save
                    </span>
                )}
            </div>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
            <div className="flex items-center gap-2">
                <div className="shrink-0 w-10 h-8 rounded-md bg-neutral-900 border border-white/10 overflow-hidden flex items-center justify-center">
                    {value ? (
                        <img
                            src={value}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                        />
                    ) : (
                        <ImageIcon className="w-3.5 h-3.5 text-neutral-600" />
                    )}
                </div>
                <Input
                    placeholder="Image URL or Cloudinary Link"
                    value={isLocalDataUri ? "Local image selected" : value ?? ""}
                    onChange={(e) => onChange(e.target.value)}
                    className="bg-white/[0.03] border-white/10 text-neutral-100 text-xs h-8 flex-1"
                />
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="shrink-0 gap-1 border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-xs h-8 px-2.5"
                    title="Select local image (Max 1MB)"
                >
                    <Upload className="w-3 h-3" />
                    Select Image
                </Button>
                {value && (
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="shrink-0 p-1.5 rounded-md text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Clear image"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>
            <p className="text-[10px] text-neutral-500">Max size: 1MB per image</p>
        </div>
    );
}

function ArrayImageField({ label, value, onChange }) {
    const items = Array.isArray(value) ? value : [];
    const fileInputRef = useRef(null);

    const updateItem = (index, newVal) => {
        const next = items.slice();
        next[index] = newVal;
        onChange(next);
    };

    const removeItem = (index) => {
        onChange(items.filter((_, i) => i !== index));
    };

    const addItem = (url = "") => {
        onChange([...items, url]);
    };

    const handleFileChange = (e) => {
        const rawFiles = Array.from(e.target.files || []);
        if (!rawFiles.length) return;

        const oversized = rawFiles.filter((f) => f.size > MAX_IMAGE_SIZE);
        const validFiles = rawFiles.filter((f) => f.size <= MAX_IMAGE_SIZE);

        if (oversized.length > 0) {
            toast.error(
                `${oversized.length} image(s) exceed 1MB limit (Max 1MB per image).`
            );
        }

        if (!validFiles.length) {
            if (fileInputRef.current) fileInputRef.current.value = "";
            return;
        }

        const readPromises = validFiles.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = () => resolve("");
                reader.readAsDataURL(file);
            });
        });

        Promise.all(readPromises).then((localUrls) => {
            const cleanUrls = localUrls.filter(Boolean);
            onChange([...items, ...cleanUrls]);
            toast.success(`${cleanUrls.length} image(s) selected (will upload on save)`);
        });

        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSingleFileReplace = (index, e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_IMAGE_SIZE) {
            toast.error(`"${file.name}" exceeds 1MB limit. Please select an image under 1MB.`);
            e.target.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            updateItem(index, reader.result);
            toast.success("Image selected (will upload on save)");
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label className="text-xs text-neutral-400">{label}</Label>
                <span className="text-[10px] font-mono uppercase text-neutral-500">
                    {items.length} image{items.length === 1 ? "" : "s"}
                </span>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
            />

            <div className="space-y-2">
                {items.map((item, index) => {
                    const isDataUri = typeof item === "string" && item.startsWith("data:image/");
                    return (
                        <div
                            key={index}
                            className="rounded-lg border border-white/10 bg-white/[0.02] p-2 flex items-center gap-2"
                        >
                            {/* Thumbnail preview */}
                            <div className="shrink-0 w-12 h-9 rounded bg-neutral-900 border border-white/10 overflow-hidden flex items-center justify-center relative">
                                {item ? (
                                    <img
                                        src={item}
                                        alt=""
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />
                                ) : (
                                    <ImageIcon className="w-3.5 h-3.5 text-neutral-600" />
                                )}
                            </div>

                            {/* URL input / label */}
                            <div className="flex-1 min-w-0">
                                <Input
                                    placeholder="Image URL or Cloudinary Link"
                                    value={isDataUri ? "Local image selected (uploads on save)" : item}
                                    onChange={(e) => updateItem(index, e.target.value)}
                                    className={`bg-white/[0.03] border-white/10 text-xs h-8 ${
                                        isDataUri ? "text-amber-400/90 italic" : "text-neutral-100"
                                    }`}
                                />
                            </div>

                            {/* Upload / replace button */}
                            <label
                                className="shrink-0 p-1.5 rounded-md text-neutral-400 hover:text-purple-300 hover:bg-purple-500/10 transition-colors cursor-pointer"
                                title="Replace with local image"
                            >
                                <Upload className="w-3.5 h-3.5" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleSingleFileReplace(index, e)}
                                />
                            </label>

                            {/* Open in new tab if valid URL */}
                            {item && typeof item === "string" && item.startsWith("http") && (
                                <a
                                    href={item}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="shrink-0 p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                                    title="Open image in new tab"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            )}

                            {/* Remove button */}
                            <button
                                type="button"
                                onClick={() => removeItem(index)}
                                className="shrink-0 p-1.5 rounded-md text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                aria-label={`Remove ${label} item`}
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className="flex items-center gap-2 pt-1">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-1.5 border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-xs h-8"
                >
                    <Upload className="w-3.5 h-3.5" />
                    Select Image(s)
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addItem("")}
                    className="gap-1.5 border-white/15 bg-white/[0.02] hover:bg-white/[0.06] text-neutral-300 text-xs h-8"
                >
                    <Plus className="w-3.5 h-3.5" />
                    Add URL
                </Button>
            </div>
            <p className="text-[10px] text-neutral-500">Max size: 1MB per image</p>
        </div>
    );
}

function ArrayTextField({ label, value, onChange }) {
    const items = Array.isArray(value) ? value : [];

    const updateItem = (index, newVal) => {
        const next = items.slice();
        next[index] = newVal;
        onChange(next);
    };

    const removeItem = (index) => {
        onChange(items.filter((_, i) => i !== index));
    };

    const addItem = () => {
        onChange([...items, ""]);
    };

    return (
        <div className="space-y-2">
            <Label className="text-xs text-neutral-400">{label}</Label>
            <div className="space-y-2">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <Input
                            value={item}
                            onChange={(e) => updateItem(index, e.target.value)}
                            className="bg-white/[0.03] border-white/10 text-neutral-100"
                        />
                        <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="shrink-0 p-1.5 rounded-md text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            aria-label={`Remove ${label} item`}
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ))}
            </div>
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addItem}
                className="gap-1.5 border-white/15 bg-white/[0.02] hover:bg-white/[0.06] text-neutral-300"
            >
                <Plus className="w-3.5 h-3.5" />
                Add
            </Button>
        </div>
    );
}

function ArrayObjectField({ label, value, itemFields, onChange }) {
    const items = Array.isArray(value) ? value : [];

    const updateItem = (index, fieldName, newVal) => {
        const next = items.slice();
        next[index] = { ...next[index], [fieldName]: newVal };
        onChange(next);
    };

    const removeItem = (index) => {
        onChange(items.filter((_, i) => i !== index));
    };

    const addItem = () => {
        const blank = {};
        itemFields.forEach((f) => {
            blank[f.name] =
                f.type === "checkbox" ? false
                    : f.type === "number" ? 0
                        : f.type === "array-text" || f.type === "array-image" ? []
                            : "";
        });
        onChange([...items, blank]);
    };

    return (
        <div className="space-y-2">
            <Label className="text-xs text-neutral-400">{label}</Label>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-lg border border-white/10 bg-white/[0.02] p-3 space-y-2.5"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                                Item {index + 1}
                            </span>
                            <button
                                type="button"
                                onClick={() => removeItem(index)}
                                className="shrink-0 p-1 rounded-md text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                aria-label={`Remove ${label} item`}
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        {itemFields.map((f) => {
                            if (f.type === "checkbox") {
                                return (
                                    <div key={f.name} className="flex items-center gap-2">
                                        <Checkbox
                                            checked={!!item[f.name]}
                                            onCheckedChange={(checked) => updateItem(index, f.name, !!checked)}
                                        />
                                        <Label className="text-xs text-neutral-400">{f.label}</Label>
                                    </div>
                                );
                            }
                            if (f.type === "array-image") {
                                return (
                                    <ArrayImageField
                                        key={f.name}
                                        label={f.label}
                                        value={item[f.name]}
                                        onChange={(next) => updateItem(index, f.name, next)}
                                    />
                                );
                            }
                            if (f.type === "image") {
                                return (
                                    <SingleImageField
                                        key={f.name}
                                        label={f.label}
                                        value={item[f.name]}
                                        onChange={(next) => updateItem(index, f.name, next)}
                                    />
                                );
                            }
                            if (f.type === "array-text") {
                                return (
                                    <ArrayTextField
                                        key={f.name}
                                        label={f.label}
                                        value={item[f.name]}
                                        onChange={(next) => updateItem(index, f.name, next)}
                                    />
                                );
                            }
                            if (f.type === "textarea") {
                                return (
                                    <div key={f.name} className="space-y-1">
                                        <Label className="text-[11px] text-neutral-500">{f.label}</Label>
                                        <Textarea
                                            value={item[f.name] ?? ""}
                                            onChange={(e) => updateItem(index, f.name, e.target.value)}
                                            className="bg-white/[0.03] border-white/10 text-neutral-100 text-xs min-h-[60px]"
                                        />
                                    </div>
                                );
                            }
                            return (
                                <div key={f.name} className="space-y-1">
                                    <Label className="text-[11px] text-neutral-500">{f.label}</Label>
                                    <Input
                                        type={f.type === "number" ? "number" : "text"}
                                        value={item[f.name] ?? ""}
                                        onChange={(e) =>
                                            updateItem(
                                                index,
                                                f.name,
                                                f.type === "number" ? Number(e.target.value) : e.target.value
                                            )
                                        }
                                        className="bg-white/[0.03] border-white/10 text-neutral-100 h-8 text-xs"
                                    />
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addItem}
                className="gap-1.5 border-white/15 bg-white/[0.02] hover:bg-white/[0.06] text-neutral-300"
            >
                <Plus className="w-3.5 h-3.5" />
                Add
            </Button>
        </div>
    );
}

/**
 * SectionEditForm — left side (3fr) of the page builder. Renders a field
 * per entry in the active section's `fields` definition, and calls
 * onFieldChange(name, value) on every edit so the canvas re-renders live.
 */
export default function SectionEditForm({ section, onFieldChange, onResetSection }) {
    if (!section) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 text-center h-full min-h-[50vh] rounded-2xl border border-dashed border-white/15 bg-white/[0.015] px-6">
                <MousePointerClick className="w-6 h-6 text-neutral-600" />
                <p className="text-sm text-neutral-500">Select a section to edit</p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-5">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-400">
                        Editing
                    </p>
                    <h2 className="text-base font-semibold text-neutral-100 mt-0.5">
                        {section.sectionLabel}
                    </h2>
                </div>

                <button
                    type="button"
                    onClick={() => onResetSection?.(section.id)}
                    title="Discard edits and restore this section's default content"
                    className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium text-neutral-400 border border-white/10 bg-white/[0.02] hover:text-purple-300 hover:border-purple-500/40 hover:bg-purple-500/[0.06] transition-colors"
                >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                </button>
            </div>

            <div className="space-y-4">
                {section.fields.map((field) => {
                    const value = section.content[field.name];

                    if (field.type === "textarea") {
                        return (
                            <div key={field.name} className="space-y-1.5">
                                <Label className="text-xs text-neutral-400">{field.label}</Label>
                                <Textarea
                                    value={value ?? ""}
                                    onChange={(e) => onFieldChange(field.name, e.target.value)}
                                    className="bg-white/[0.03] border-white/10 text-neutral-100 min-h-[90px]"
                                />
                            </div>
                        );
                    }

                    if (field.type === "array-image") {
                        return (
                            <ArrayImageField
                                key={field.name}
                                label={field.label}
                                value={value}
                                onChange={(next) => onFieldChange(field.name, next)}
                            />
                        );
                    }

                    if (field.type === "image") {
                        return (
                            <SingleImageField
                                key={field.name}
                                label={field.label}
                                value={value}
                                onChange={(next) => onFieldChange(field.name, next)}
                            />
                        );
                    }

                    if (field.type === "array-text") {
                        return (
                            <ArrayTextField
                                key={field.name}
                                label={field.label}
                                value={value}
                                onChange={(next) => onFieldChange(field.name, next)}
                            />
                        );
                    }

                    if (field.type === "array-object") {
                        return (
                            <ArrayObjectField
                                key={field.name}
                                label={field.label}
                                value={value}
                                itemFields={field.itemFields}
                                onChange={(next) => onFieldChange(field.name, next)}
                            />
                        );
                    }

                    if (field.type === "checkbox") {
                        return (
                            <div key={field.name} className="flex items-center gap-2">
                                <Checkbox
                                    checked={!!value}
                                    onCheckedChange={(checked) => onFieldChange(field.name, !!checked)}
                                />
                                <Label className="text-xs text-neutral-400">{field.label}</Label>
                            </div>
                        );
                    }

                    if (field.type === "number") {
                        return (
                            <div key={field.name} className="space-y-1.5">
                                <Label className="text-xs text-neutral-400">{field.label}</Label>
                                <Input
                                    type="number"
                                    value={value ?? ""}
                                    onChange={(e) => onFieldChange(field.name, Number(e.target.value))}
                                    className="bg-white/[0.03] border-white/10 text-neutral-100"
                                />
                            </div>
                        );
                    }

                    // default: "text"
                    return (
                        <div key={field.name} className="space-y-1.5">
                            <Label className="text-xs text-neutral-400">{field.label}</Label>
                            <Input
                                value={value ?? ""}
                                onChange={(e) => onFieldChange(field.name, e.target.value)}
                                className="bg-white/[0.03] border-white/10 text-neutral-100"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
