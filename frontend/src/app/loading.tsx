export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Logo Pulse */}
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl animate-pulse" />
          <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl animate-ping opacity-20" />
        </div>
        {/* Skeleton shimmer lines */}
        <div className="space-y-2 w-48">
          <div className="h-3 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-3 bg-gray-200 rounded-full animate-pulse w-3/4 mx-auto" />
        </div>
      </div>
    </div>
  );
}
