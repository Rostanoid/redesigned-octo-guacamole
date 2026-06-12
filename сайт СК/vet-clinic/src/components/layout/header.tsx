import Link from 'next/link';
import { Phone, Mail, MapPin, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { href: '/', label: 'Главная' },
  { href: '/about', label: 'О клинике' },
  { href: '/specialists', label: 'Специалисты' },
  { href: '/services', label: 'Услуги' },
  { href: '/subscriptions', label: 'Подписки' },
  { href: '/blog', label: 'Блог' },
  { href: '/faq', label: 'Вопросы' },
  { href: '/contact', label: 'Контакты' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm ring-1 ring-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white font-bold text-xl">
              В
            </div>
            <span className="text-xl font-bold text-neutral-900 font-display">
              ВетКлиника
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-neutral-700 transition-colors hover:text-primary-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-6 text-sm text-neutral-600">
              <a href="tel:+74951234567" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +7 (495) 123-45-67
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="hidden sm:inline-flex btn-secondary text-sm px-4 py-2"
              >
                Войти
              </Link>
              <Link
                href="/register"
                className="hidden sm:inline-flex btn-primary text-sm px-4 py-2"
              >
                Регистрация
              </Link>
            </div>
            <button
              className="md:hidden rounded-lg p-2 text-neutral-600 hover:bg-neutral-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Меню"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-neutral-200">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-base font-medium text-neutral-700 rounded-lg hover:bg-neutral-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href="/login"
                  className="btn-secondary text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Войти
                </Link>
                <Link
                  href="/register"
                  className="btn-primary text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Регистрация
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}