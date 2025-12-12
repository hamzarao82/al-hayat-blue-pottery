import { Skeleton } from "@/components/ui/skeleton"

export function GallerySkeleton() {
    return (
        <div className="grid grid-cols-3 gap-3 md:gap-4">
            {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-40 md:h-48 rounded-xl w-full" />
            ))}
        </div>
    )
}
