export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-40 bg-gray-200 rounded-xl w-full"></div>
                ))}
            </div>
        </div>
    );
}
