'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="card max-w-md text-center">
        <AlertCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
        <h2 className="mb-2 text-2xl font-bold text-neutral-900">
          Что-то пошло не так
        </h2>
        <p className="mb-6 text-neutral-600">
          При загрузке страницы произошла ошибка. Пожалуйста, попробуйте снова.
        </p>
        <button onClick={reset} className="btn-primary inline-flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Попробовать снова
        </button>
      </div>
    </div>
  );
}