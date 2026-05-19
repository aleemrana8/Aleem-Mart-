import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black text-gray-100 mb-4 select-none">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
