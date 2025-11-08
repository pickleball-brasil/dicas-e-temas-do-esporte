"use client";
import { useLayoutContext } from '@/contexts/LayoutContext';
import { usePathname } from 'next/navigation';

export default function MobileLayoutSelector() {
  const { layout, setLayout } = useLayoutContext();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Só mostra na página principal e no mobile
  if (!isHomePage) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:hidden">
      <div className="inline-flex items-center gap-1 p-1 bg-white rounded-lg border border-gray-300 shadow-lg">
        <button
          onClick={() => setLayout("grid")}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
            layout === "grid"
              ? "bg-gray-100 text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
          title="Layout em grade"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
        <button
          onClick={() => setLayout("list")}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
            layout === "list"
              ? "bg-gray-100 text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
          title="Layout em lista"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

