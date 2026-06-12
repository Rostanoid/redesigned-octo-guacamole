'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginSchema, type LoginInput } from '@/lib/validations';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LoginInput>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Ошибка входа');
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Произошла ошибка. Попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900 font-display">
            Вход в личный кабинет
          </h1>
          <p className="mt-2 text-neutral-600">
            Введите email и пароль для доступа к записи
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            placeholder="example@mail.ru"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Пароль"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="h-4 w-4 rounded border-neutral-300" />
              Запомнить меня
            </label>
            <Link href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
              Забыли пароль?
            </Link>
          </div>

          <Button type="submit" loading={isSubmitting} className="w-full">
            Войти
          </Button>

          <p className="text-center text-sm text-neutral-600">
            Нет аккаунта?{' '}
            <Link href="/register" className="text-primary-600 hover:text-primary-700 font-medium">
              Зарегистрироваться
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}