'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  PawPrint,
  Calendar,
  CreditCard,
  Star,
  Settings,
  LogOut,
} from 'lucide-react';

const sidebarItems = [
  { href: '/dashboard', label: 'Обзор', icon: LayoutDashboard },
  { href: '/dashboard/pets', label: 'Мои питомцы', icon: PawPrint },
  { href: '/dashboard/appointments', label: 'Записи', icon: Calendar },
  { href: '/dashboard/payments', label: 'Платежи', icon: CreditCard },
  { href: '/dashboard/subscription', label: 'Подписка', icon: Star },
  { href: '/dashboard/admin', label: 'Админ панель', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col gap-6 border-r border-neutral-200 bg-white p-6 lg:flex h-screen sticky top-0">
      <div className="flex items-center gap-3 pb-6 border-b border-neutral-100">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white font-bold">
          В
        </div>
        <span className="font-bold text-xl font-display">ВетКлиника</span>
      </div>

      <nav className="flex flex-col gap-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-neutral-100">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900">
          <LogOut className="h-5 w-5" />
          Выйти
        </button>
      </div>
    </aside>
  );
}