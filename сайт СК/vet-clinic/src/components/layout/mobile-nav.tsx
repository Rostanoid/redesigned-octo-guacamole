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
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

const mobileNavItems = [
  { href: '/dashboard', label: 'Обзор', icon: LayoutDashboard },
  { href: '/dashboard/pets', label: 'Питомцы', icon: PawPrint },
  { href: '/dashboard/appointments', label: 'Записи', icon: Calendar },
  { href: '/dashboard/payments', label: 'Платежи', icon: CreditCard },
  { href: '/dashboard/subscription', label: 'Подписка', icon: Star },
];

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg"
      >
        <Menu className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-x-4 bottom-20 top-20 rounded-2xl bg-white p-6">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"
            >
              <X className="h-5 w-5" />
            </button>

            <nav className="flex flex-col gap-2 mt-8">
              {mobileNavItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      'flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-all duration-200',
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-600 hover:bg-neutral-50'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}