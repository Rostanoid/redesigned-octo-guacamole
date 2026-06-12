import Link from 'next/link';
import { Sidebar } from '@/components/layout/sidebar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { getAuthUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Личный кабинет | ВетКлиника',
};

export default async function DashboardPage() {
  const user = await getAuthUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-neutral-50 lg:bg-white">
      <Sidebar />
      <MobileNav />

      <main className="flex-1 lg:pl-8">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 font-display">
              Добро пожаловать, {user.firstName}!
            </h1>
            <p className="text-neutral-600 mt-2">
              Управляйте записями, питомцами и подпиской в одном месте
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Link href="/dashboard/appointments" className="card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm0 16h-14v-14h14v14z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Записи</h3>
                  <p className="text-sm text-neutral-600">Посмотреть и изменить</p>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/pets" className="card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Мои питомцы</h3>
                  <p className="text-sm text-neutral-600">Добавить или изменить</p>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/payments" className="card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Платежи</h3>
                  <p className="text-sm text-neutral-600">История оплат</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="card mb-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Ближайшая запись
            </h2>
            <div className="flex items-center justify-between py-4 border-b border-neutral-100 last:border-0">
              <div>
                <p className="font-medium text-neutral-900">Терапевтическое осмотр</p>
                <p className="text-sm text-neutral-600">30 июня, 14:00</p>
              </div>
              <span className="text-sm text-primary-600 font-medium">Подтверждена</span>
            </div>
            <div className="mt-4">
              <Link href="/dashboard/appointments" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Все записи →
              </Link>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Текущая подписка
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-900">Standard</p>
                <p className="text-sm text-neutral-600">Действует до 15 августа</p>
              </div>
              <Link href="/dashboard/subscription" className="btn-secondary text-sm">
                Управление
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}