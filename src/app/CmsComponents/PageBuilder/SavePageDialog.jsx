import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";

const CATEGORY_OPTIONS = [
    "Solutions",
    "Services",
    "Industries",
    "Case Studies",
    "Portfolios",
    "Blog",
    "Landing Page",
    "Other",
];

const slugify = (value) =>
    (value || "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

/**
 * SavePageDialog — opened by the Save button. Collects the page-level
 * metadata (name, slug, category, SEO meta, author) that lives alongside
 * the sections but isn't part of any one section's content. Its own Save
 * button hands the filled-in form back via onSave.
 */
export default function SavePageDialog({ open, onOpenChange, onSave, initialValues, isEdit = false, saving = false }) {
    const { admin } = useAuth();

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [slugTouched, setSlugTouched] = useState(false);
    const [category, setCategory] = useState("");
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [status, setStatus] = useState(true);

    // Prefill from `initialValues` when editing an existing page; otherwise
    // just prefill "Created by" with the logged-in admin — either way,
    // without clobbering anything the user already typed.
    useEffect(() => {
        if (!open) return;
        if (initialValues) {
            setName((prev) => prev || initialValues.name || "");
            setSlug((prev) => prev || initialValues.slug || "");
            setCategory((prev) => prev || initialValues.category || "");
            setMetaTitle((prev) => prev || initialValues.metaTitle || "");
            setMetaDescription((prev) => prev || initialValues.metaDescription || "");
            setCreatedBy((prev) => prev || initialValues.createdBy || admin?.name || "Admin");
            setStatus(
                initialValues.status !== undefined
                    ? initialValues.status === true ||
                      initialValues.status === "true" ||
                      initialValues.status === "published"
                    : true
            );
        } else {
            setCreatedBy((prev) => prev || admin?.name || "Admin");
            setStatus(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, initialValues]);

    const handleNameChange = (value) => {
        setName(value);
        if (!slugTouched) setSlug(slugify(value));
    };

    const handleSlugChange = (value) => {
        setSlugTouched(true);
        setSlug(value);
    };

    const handleSave = () => {
        onSave({
            name,
            slug,
            category,
            metaTitle,
            metaDescription,
            createdBy,
            status,
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg bg-[#0A0A0A] border-white/10 text-neutral-100">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Update page" : "Page details"}</DialogTitle>
                    <DialogDescription className="text-neutral-400">
                        {isEdit ? "Review the page information, then update." : "Fill in the page information, then save."}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                    {/* Status Toggle Switch */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/10">
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                                <Label className="text-xs font-medium text-neutral-200">Page Status</Label>
                                <span
                                    className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-full ${
                                        status
                                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                            : "bg-neutral-800 text-neutral-400 border border-white/5"
                                    }`}
                                >
                                    {status ? "Active (True)" : "Inactive (False)"}
                                </span>
                            </div>
                            <p className="text-[11px] text-neutral-400">
                                {status
                                    ? "This page will be live and accessible."
                                    : "This page will be inactive / hidden."}
                            </p>
                        </div>
                        <Switch
                            checked={status}
                            onCheckedChange={setStatus}
                            className="data-[state=checked]:bg-emerald-500"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs text-neutral-400">Page name</Label>
                        <Input
                            value={name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            placeholder="e.g. Software Development"
                            className="bg-white/[0.03] border-white/10 text-neutral-100"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs text-neutral-400">Page slug</Label>
                        <Input
                            value={slug}
                            onChange={(e) => handleSlugChange(e.target.value)}
                            placeholder="e.g. software-development"
                            disabled={isEdit}
                            className="bg-white/[0.03] border-white/10 text-neutral-100 disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                        {isEdit && (
                            <p className="text-[11px] text-neutral-500">
                                Slug can't be changed after the page is created.
                            </p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs text-neutral-400">Page category</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="bg-white/[0.03] border-white/10 text-neutral-100">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0B0B0B] border-white/10 text-neutral-100">
                                {CATEGORY_OPTIONS.map((c) => (
                                    <SelectItem key={c} value={c}>
                                        {c}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs text-neutral-400">Meta title</Label>
                        <Input
                            value={metaTitle}
                            onChange={(e) => setMetaTitle(e.target.value)}
                            className="bg-white/[0.03] border-white/10 text-neutral-100"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs text-neutral-400">Meta description</Label>
                        <Textarea
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            className="bg-white/[0.03] border-white/10 text-neutral-100 min-h-[80px]"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs text-neutral-400">Created by</Label>
                        <Input
                            value={createdBy}
                            onChange={(e) => setCreatedBy(e.target.value)}
                            className="bg-white/[0.03] border-white/10 text-neutral-100"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={saving}
                        className="border-white/15 bg-white/[0.02] hover:bg-white/[0.06] text-neutral-200"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-60"
                    >
                        {saving ? (isEdit ? "Updating…" : "Saving…") : isEdit ? "Update" : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
