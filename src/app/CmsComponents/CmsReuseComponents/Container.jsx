import { cn } from "@/lib/utils";

/**
 * Container — simple max-width + horizontal padding wrapper, matching the
 * layout width used across the other CMS sections (Hero1, Narrative, etc).
 */
const Container = ({ children, className = "" }) => (
    <div className={cn("max-w-7xl mx-auto px-5 sm:px-6 md:px-10", className)}>
        {children}
    </div>
);

export default Container;
