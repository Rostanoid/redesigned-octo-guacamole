import Link from 'next/link';
import { Heart, Phone, Mail, MapPin, Clock } from 'lucide-react';

const footerLinks = {
  services: [
    { href: '/services', label: 'Терапевтическое лечение' },
    { href: '/services', label: 'Вакцинация' },
    { href: '/services', label: 'Хирургия' },
    { href: '/services', label: 'Диагностика' },
    { href: '/services', label: 'Стоматология' },
  ],
  about: [
    { href: '/about', label: 'История клиники' },
    { href: '/about', label: 'Миссия и ценности' },
    { href: '/specialists', label: 'Наши врачи' },
    { href: '/licenses', label: 'Лицензии' },
  ],
  support: [
    { href: '/faq', label: 'Частые вопросы' },
    { href: '/contact', label: 'Обратная связь' },
    { href: '/privacy', label: 'Политика конфиденциальности' },
    { href: '/terms', label: 'Пользовательское соглашение' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 font-bold text-xl">
                В
              </div>
              <span className="text-xl font-bold font-display">ВетКлиника</span>
            </Link>
            <p className="text-sm text-neutral-400 mb-4">
              Современная ветеринарная клиника в Москве. Заботимся о ваших питомцах с 2010 года.
            </p>
            <div className="flex items-center gap-2 text-primary-400">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">Любим животных как собственных</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">О клинике</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-400">
                  ул. Пушкинская, д. 15, Москва, 125009
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <a href="tel:+74951234567" className="text-sm text-neutral-400 hover:text-white">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <a href="mailto:info@vetclinic.ru" className="text-sm text-neutral-400 hover:text-white">
                  info@vetclinic.ru
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary-400" />
                <span className="text-sm text-neutral-400">
                  Ежедневно 9:00 - 21:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} ВетКлиника. Все права защищены.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.support.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}