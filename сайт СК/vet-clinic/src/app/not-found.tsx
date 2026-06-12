import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="card max-w-md text-center">
        <Search className="mx-auto mb-4 h-16 w-16 text-neutral-400" />
        <h2 className="mb-2 text-3xl font-bold text-neutral-900">
          Страница не найдена
        </h2>
        <p className="mb-6 text-neutral-600">
          К сожалению, запрашиваемая страница не существует или была удалена.
        </p>
        <Link href="/" className="btn-primary inline-flex items-center gap-2">
          <Home className="h-4 w-4" />
          На главную
        </Link>
      </div>
    </div>
  );
}