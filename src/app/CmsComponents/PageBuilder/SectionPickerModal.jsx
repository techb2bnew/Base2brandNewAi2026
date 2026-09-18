import { useEffect, useState } from "react";
import { LayoutTemplate, Check, ChevronLeft, Lock, Layers } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { getSectionsByCategory, getSectionByKey, singletonCategories } from "./sectionRegistry";

const HERO_CATEGORY = "Hero Sections";

/**
 * SectionPickerModal — two-step popup: pick a category, then pick a section
 * from it (thumbnail-style cards). Selecting a section calls onSelect with
 * the registry entry so the caller can add it to the canvas.
 *
 * `sections` (the sections already on the canvas) is used to:
 *   - lock every category except "Hero Sections" until the page has at
 *     least one section — a page always starts with a hero
 *   - badge/disable a section entry that's already on the page
 *   - lock the rest of a singleton category (e.g. "Hero Sections") once one
 *     of its entries has been added, since a page only has one hero
 */
export default function SectionPickerModal({ open, onOpenChange, onSelect, sections = [] }) {
    const grouped = getSectionsByCategory();
    const categories = Object.keys(grouped);
    const [activeCategory, setActiveCategory] = useState(null);

    // Always start at the category list whenever the picker is (re)opened.
    useEffect(() => {
        if (open) setActiveCategory(null);
    }, [open]);

    const canvasEmpty = sections.length === 0;
    const usedCategories = new Set(
        sections.map((s) => getSectionByKey(s.sectionType)?.category).filter(Boolean)
    );
    const usedKeys = new Set(sections.map((s) => s.sectionType));

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-[#0A0A0A] border-white/10 text-neutral-100">
                <DialogHeader>
                    {activeCategory ? (
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => setActiveCategory(null)}
                                className="shrink-0 p-1 -ml-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                                aria-label="Back to categories"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <DialogTitle>{activeCategory}</DialogTitle>
                        </div>
                    ) : (
                        <DialogTitle>Add a section</DialogTitle>
                    )}
                    <DialogDescription className="text-neutral-400">
                        {activeCategory
                            ? "Pick a section from this category to add to the page."
                            : canvasEmpty
                                ? "Every page starts with a hero — pick that category to begin."
                                : "Choose a category to see the sections it offers."}
                    </DialogDescription>
                </DialogHeader>

                {!activeCategory && (
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {categories.map((category) => {
                            const isHero = category === HERO_CATEGORY;
                            const locked = canvasEmpty && !isHero;
                            const count = grouped[category].length;

                            return (
                                <button
                                    key={category}
                                    type="button"
                                    disabled={locked}
                                    onClick={() => setActiveCategory(category)}
                                    title={locked ? "Add a hero section first" : undefined}
                                    className={cn(
                                        "group relative flex flex-col items-center justify-center gap-2 rounded-xl border p-6 aspect-video transition-colors",
                                        locked
                                            ? "border-white/10 bg-white/[0.015] opacity-40 cursor-not-allowed"
                                            : "border-white/10 bg-white/[0.02] hover:border-purple-500/50 hover:bg-purple-500/[0.06]"
                                    )}
                                >
                                    {locked ? (
                                        <Lock className="w-5 h-5 text-neutral-600" />
                                    ) : (
                                        <Layers className="w-5 h-5 text-neutral-500 group-hover:text-purple-400 transition-colors" />
                                    )}
                                    <span className="text-sm font-medium text-neutral-200">{category}</span>
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                                        {count} section{count === 1 ? "" : "s"}
                                    </span>
                                </button>
                            );
                        })}

                        {categories.length === 0 && (
                            <p className="text-sm text-neutral-500 col-span-full">
                                No sections registered yet.
                            </p>
                        )}
                    </div>
                )}

                {activeCategory && (
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {grouped[activeCategory].map((entry) => {
                            const isAdded = usedKeys.has(entry.key);
                            const categoryLocked =
                                singletonCategories.has(activeCategory) &&
                                usedCategories.has(activeCategory) &&
                                !isAdded;
                            const disabled = isAdded || categoryLocked;

                            return (
                                <button
                                    key={entry.key}
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => {
                                        if (disabled) return;
                                        onSelect(entry);
                                        onOpenChange(false);
                                    }}
                                    title={
                                        categoryLocked
                                            ? "Only one hero section per page"
                                            : isAdded
                                                ? "Already on this page"
                                                : undefined
                                    }
                                    className={cn(
                                        "group bg-container relative flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] transition-colors p-5 aspect-video",
                                        disabled
                                            ? "opacity-40 cursor-not-allowed"
                                            : "hover:border-purple-500/50 hover:bg-purple-500/[0.06]"
                                    )}
                                >
                                    {/* Fallback icon sits underneath; if there's no
                                        thumbnail yet (or it fails to load) this shows
                                        through instead of a broken image. */}
                                    <LayoutTemplate className="absolute w-6 h-6 text-neutral-600 group-hover:text-purple-400 transition-colors" />
                                    {entry.default_viewimage && (
                                        <img
                                            src={entry.default_viewimage}
                                            alt=""
                                            className="w-full h-full absolute inset-0 object-cover rounded-lg"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />
                                    )}

                                    {isAdded && (
                                        <span className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-full bg-purple-600 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-white">
                                            <Check className="w-3 h-3" />
                                            Selected
                                        </span>
                                    )}

                                    <span className="relative text-sm font-medium text-neutral-200">
                                        {entry.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
