import { GripVertical, EyeOff } from "lucide-react";
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { isSectionLocked } from "@/CmsComponents/PageBuilder/sectionRegistry";

/** One draggable row — label + grip handle, no live component preview. */
function SequenceRow({ section, index }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: section.id,
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5 transition-colors",
                isDragging && "opacity-40 border-purple-500/40 shadow-lg shadow-black/40"
            )}
        >
            <button
                type="button"
                {...attributes}
                {...listeners}
                title="Drag to reorder"
                aria-label={`Reorder ${section.sectionLabel}`}
                className="shrink-0 flex items-center justify-center w-7 h-7 rounded-md text-neutral-400 hover:text-purple-300 hover:bg-white/5 cursor-grab active:cursor-grabbing transition-colors touch-none"
            >
                <GripVertical className="w-4 h-4 pointer-events-none" />
            </button>
            <span className="shrink-0 w-6 text-[11px] font-mono text-neutral-500 text-right">
                {index + 1}
            </span>
            <span className="flex-1 min-w-0 text-sm text-neutral-200 truncate">
                {section.sectionLabel}
            </span>
            {section.hidden && (
                <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-amber-400">
                    <EyeOff className="w-3 h-3" />
                    Hidden
                </span>
            )}
        </div>
    );
}

/**
 * SequenceModal — "Component Sequence" popup. Lists every section except
 * the locked Hero, reorderable via the same drag-and-drop system as the
 * main canvas.
 *
 * This deliberately owns no ordering state of its own: `sections` and
 * `onReorder` are the exact same props/handler CmsPages already passes to
 * SectionCanvas, so a drag here calls the identical reducer that a drag on
 * the canvas does. Both surfaces re-render from the same lifted `sections`
 * state, which is what keeps them in sync in both directions for free —
 * there is no separate order to fall out of sync.
 */
export default function SequenceModal({ open, onOpenChange, sections = [], onReorder }) {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const unlockedSections = sections
        .slice()
        .sort((a, b) => a.order - b.order)
        .filter((s) => !isSectionLocked(s));

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        onReorder?.(active.id, over.id);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto bg-[#0A0A0A] border-white/10 text-neutral-100">
                <DialogHeader>
                    <DialogTitle>Component Sequence</DialogTitle>
                    <DialogDescription className="text-neutral-400">
                        Drag to reorder. Hero Section always stays first and isn't listed here.
                    </DialogDescription>
                </DialogHeader>

                {unlockedSections.length === 0 ? (
                    <p className="text-sm text-neutral-500 py-6 text-center">
                        No reorderable sections yet — add one from the builder.
                    </p>
                ) : (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext
                            items={unlockedSections.map((s) => s.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="mt-2 space-y-2">
                                {unlockedSections.map((section, i) => (
                                    <SequenceRow key={section.id} section={section} index={i} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </DialogContent>
        </Dialog>
    );
}
