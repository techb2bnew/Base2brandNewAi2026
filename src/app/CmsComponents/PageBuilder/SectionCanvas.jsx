import { useState } from "react";
import { Plus, Trash2, GripVertical, Lock, ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";
import { LazyMotion, domAnimation } from "framer-motion";
import {
    DndContext,
    PointerSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
    closestCenter,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    sortableKeyboardCoordinates,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { isSectionLocked } from "@/CmsComponents/PageBuilder/sectionRegistry";

const badgeClass = (isActive, isHidden) =>
    cn(
        "absolute top-2 left-4 z-20 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border transition-colors",
        isActive
            ? "bg-purple-600 border-purple-400 text-white"
            : isHidden
                ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                : "bg-neutral-900 border-white/15 text-neutral-400"
    );

const iconButtonClass =
    "flex items-center justify-center w-6 h-6 rounded-full border border-white/15 bg-neutral-900 text-neutral-400 transition-colors";

/** Compact placeholder shown instead of the live component when collapsed. */
function CollapsedBody() {
    return (
        <div className="h-12 flex items-center px-4 pt-2">
            <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-600">
                Collapsed — click the chevron to expand
            </p>
        </div>
    );
}

/** Thin "+" gap between two cards — inserts a new section at that exact position. */
function InsertRow({ onClick, label }) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <button
                type="button"
                onClick={onClick}
                aria-label={label}
                title={label}
                className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full border border-white/10 bg-white/[0.02] text-neutral-600 hover:text-purple-300 hover:border-purple-500/50 hover:bg-purple-500/10 transition-colors"
            >
                <Plus className="w-3.5 h-3.5" />
            </button>
            <div className="flex-1 h-px bg-white/[0.06]" />
        </div>
    );
}

/** Collapse / hide-visibility / remove icon cluster shared by both card types. */
function CardActions({ section, isCollapsed, isHidden, onToggleCollapse, onToggleHidden, onRemove, allowHide = true }) {
    return (
        <div className="absolute top-2 right-4 z-20 flex items-center gap-1.5">
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleCollapse(section.id);
                }}
                aria-label={isCollapsed ? `Expand ${section.sectionLabel}` : `Collapse ${section.sectionLabel}`}
                title={isCollapsed ? "Expand" : "Collapse"}
                className={cn(iconButtonClass, "hover:text-purple-300 hover:border-purple-500/50")}
            >
                {isCollapsed ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
            </button>
            {allowHide && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleHidden(section.id);
                    }}
                    aria-label={isHidden ? `Show ${section.sectionLabel} on the live page` : `Hide ${section.sectionLabel} from the live page`}
                    title={isHidden ? "Hidden on the live page — click to show" : "Hide from the live page (stays in the builder)"}
                    className={cn(
                        iconButtonClass,
                        isHidden
                            ? "text-amber-400 border-amber-500/40 hover:text-amber-300 hover:border-amber-500/60"
                            : "hover:text-purple-300 hover:border-purple-500/50"
                    )}
                >
                    {isHidden ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </button>
            )}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove(section.id);
                }}
                aria-label={`Remove ${section.sectionLabel}`}
                className={cn(iconButtonClass, "hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10")}
            >
                <Trash2 className="w-3 h-3" />
            </button>
        </div>
    );
}

/**
 * Hero (locked) section — same look, no grip handle, small lock icon
 * instead. No hide toggle either: the Hero is the page's mandatory anchor,
 * so it can't be taken off the live page without removing it outright.
 */
function LockedSectionCard({ section, isActive, isCollapsed, onSelect, onRemove, onToggleCollapse, onContentFieldChange }) {
    const Comp = section.componentRef;
    return (
        <div
            onClick={() => onSelect(section.id)}
            className={cn(
                "relative rounded-2xl border-2 cursor-pointer transition-colors overflow-hidden bg-[#0A0A0A] transform-gpu",
                isActive ? "border-purple-500" : "border-transparent hover:border-purple-500/40"
            )}
        >
            <div className={badgeClass(isActive, false)}>
                <Lock className="w-2.5 h-2.5" />
                {section.sectionLabel}
            </div>

            <CardActions
                section={section}
                isCollapsed={isCollapsed}
                onToggleCollapse={onToggleCollapse}
                onRemove={onRemove}
                allowHide={false}
            />

            {isCollapsed ? (
                <CollapsedBody />
            ) : (
                // pointer-events-none is the default here (see the note on
                // SortableSectionCard below) — a section that needs live
                // in-canvas interaction (e.g. Hero3's draggable floating
                // metric cards) re-enables pointer-events on just its own
                // interactive element(s) via isBuilderCanvas.
                <div className="pointer-events-none">
                    <Comp
                        {...section.content}
                        isBuilderCanvas
                        onContentChange={(fieldName, value) => onContentFieldChange?.(section.id, fieldName, value)}
                    />
                </div>
            )}
        </div>
    );
}

/** Any other section — draggable via @dnd-kit, grip handle in the top-center. */
function SortableSectionCard({ section, isActive, isCollapsed, onSelect, onRemove, onToggleCollapse, onToggleHidden, onContentFieldChange }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: section.id,
    });
    const Comp = section.componentRef;
    const isHidden = !!section.hidden;
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={() => onSelect(section.id)}
            className={cn(
                // transform-gpu (any transform) makes this div the containing
                // block for position:fixed descendants — without it, a
                // scroll-jacking section (e.g. BuildingNow) would escape this
                // card and cover the whole admin page.
                "relative rounded-2xl border-2 cursor-pointer transition-colors overflow-hidden bg-[#0A0A0A] transform-gpu",
                isActive ? "border-purple-500" : "border-transparent hover:border-purple-500/40",
                isDragging && "opacity-40 shadow-2xl shadow-black/50"
            )}
        >
            <div className={badgeClass(isActive, isHidden)}>
                {section.sectionLabel}
                {isHidden && <span className="ml-0.5">· Hidden</span>}
            </div>

            <button
                type="button"
                {...attributes}
                {...listeners}
                onClick={(e) => e.stopPropagation()}
                title="Drag to reorder"
                aria-label={`Reorder ${section.sectionLabel}`}
                className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-6 h-6 rounded-full border border-white/15 bg-neutral-900 text-neutral-400 hover:text-purple-300 hover:border-purple-500/50 cursor-grab active:cursor-grabbing transition-colors touch-none"
            >
                <GripVertical className="w-3.5 h-3.5 pointer-events-none" />
            </button>

            <CardActions
                section={section}
                isCollapsed={isCollapsed}
                isHidden={isHidden}
                onToggleCollapse={onToggleCollapse}
                onToggleHidden={onToggleHidden}
                onRemove={onRemove}
            />

            {isCollapsed ? (
                <CollapsedBody />
            ) : (
                // pointer-events-none keeps live links/buttons inside the
                // section from navigating while building the page — clicks
                // fall through to the wrapper above and select the section.
                // isBuilderCanvas tells a section it's rendering inside the
                // compact edit card (not the full preview/live page), so a
                // scroll-jacking section like BuildingNow can fall back to
                // its static layout instead of hijacking page scroll.
                <div className={cn("pointer-events-none", isHidden && "opacity-40")}>
                    <Comp
                        {...section.content}
                        isBuilderCanvas
                        onContentChange={(fieldName, value) => onContentFieldChange?.(section.id, fieldName, value)}
                    />
                </div>
            )}
        </div>
    );
}

/**
 * SectionCanvas — right side (9fr) of the page builder. Renders every
 * section live, in order, with its current content. Clicking a section
 * makes it active so SectionEditForm can edit it. Empty state shows a
 * big "+" to add the first section.
 *
 * Drag & drop reordering is powered by @dnd-kit (PointerSensor + KeyboardSensor,
 * a11y-friendly). Locked sections (the Hero) are rendered outside the
 * DndContext entirely — they never join the sortable list, so they can
 * neither be dragged nor be a drop target; only the unlocked sections
 * below them are wrapped in the drag-and-drop system.
 *
 * Collapse/expand is a purely visual, per-card toggle (tracked here, not on
 * `section` itself) — it never touches content, order or any saved data,
 * it just swaps a card's live render for a short placeholder so a long page
 * with many sections is easier to scan and reorder.
 *
 * Insert-between: a thin "+" row sits in every gap between cards (after the
 * locked Hero, and between each pair of unlocked sections). Clicking one
 * calls onOpenPicker(afterId) instead of the plain onOpenPicker() the
 * bottom "Add Another Section" button uses — CmsPages resolves that id into
 * an insert position, so there's no separate ordering logic here.
 */
export default function SectionCanvas({ sections, activeId, onSelect, onOpenPicker, onRemove, onReorder, onToggleHidden, onContentFieldChange }) {
    const [collapsedIds, setCollapsedIds] = useState(() => new Set());

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const toggleCollapsed = (id) => {
        setCollapsedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    if (sections.length === 0) {
        return (
            <div className="flex-1 min-h-[70vh] flex items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.015]">
                <button
                    type="button"
                    onClick={() => onOpenPicker()}
                    className="group flex flex-col items-center gap-4 px-10 py-12 rounded-xl transition-colors hover:bg-white/[0.03]"
                >
                    <span className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-600/15 border border-purple-500/30 text-purple-300 group-hover:bg-purple-600/25 group-hover:border-purple-500/50 transition-colors">
                        <Plus className="w-8 h-8" />
                    </span>
                    <span className="text-sm font-medium text-neutral-200">
                        Add Hero Section
                    </span>
                </button>
            </div>
        );
    }

    const sorted = sections.slice().sort((a, b) => a.order - b.order);
    const lockedSections = sorted.filter(isSectionLocked);
    const unlockedSections = sorted.filter((s) => !isSectionLocked(s));
    const lastLocked = lockedSections[lockedSections.length - 1];

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        onReorder?.(active.id, over.id);
    };

    return (
        <LazyMotion features={domAnimation}>
            <div className="flex-1 space-y-6">
                {lockedSections.map((section) => (
                    <LockedSectionCard
                        key={section.id}
                        section={section}
                        isActive={section.id === activeId}
                        isCollapsed={collapsedIds.has(section.id)}
                        onSelect={onSelect}
                        onRemove={onRemove}
                        onToggleCollapse={toggleCollapsed}
                        onContentFieldChange={onContentFieldChange}
                    />
                ))}

                {lastLocked && (
                    <InsertRow
                        onClick={() => onOpenPicker(lastLocked.id)}
                        label={`Insert section after ${lastLocked.sectionLabel}`}
                    />
                )}

                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext
                        items={unlockedSections.map((s) => s.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="space-y-6">
                            {unlockedSections.flatMap((section, i) => {
                                const card = (
                                    <SortableSectionCard
                                        key={section.id}
                                        section={section}
                                        isActive={section.id === activeId}
                                        isCollapsed={collapsedIds.has(section.id)}
                                        onSelect={onSelect}
                                        onRemove={onRemove}
                                        onToggleCollapse={toggleCollapsed}
                                        onToggleHidden={onToggleHidden}
                                        onContentFieldChange={onContentFieldChange}
                                    />
                                );
                                if (i === unlockedSections.length - 1) return [card];
                                return [
                                    card,
                                    <InsertRow
                                        key={`insert-${section.id}`}
                                        onClick={() => onOpenPicker(section.id)}
                                        label={`Insert section after ${section.sectionLabel}`}
                                    />,
                                ];
                            })}
                        </div>
                    </SortableContext>
                </DndContext>

                <div className="flex justify-center pt-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenPicker()}
                        className="gap-2 border-white/15 bg-white/[0.02] hover:bg-white/[0.06] text-neutral-200"
                    >
                        <Plus className="w-4 h-4" />
                        Add Another Section
                    </Button>
                </div>
            </div>
        </LazyMotion>
    );
}
