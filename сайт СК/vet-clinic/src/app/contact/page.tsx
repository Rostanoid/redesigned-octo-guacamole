'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';

export const metadata = {
  title: 'Контакты | ВетКлиника',
  description: 'Адрес, телефон, email, карта проезда. Свяжитесь с нами удобным способом',
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4 font-display">
          Связаться с нами
        </h1>
        <p className="text-lg text-neutral-600">
          Мы всегда рады ответить на ваши вопросы
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            Контактная информация
          </h2>

          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600 flex-shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Адрес</h3>
                <p className="text-neutral-600">
                  ул. Пушкинская, д. 15, Москва, 125009
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600 flex-shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Телефон</h3>
                <a href="tel:+74951234567" className="text-neutral-600 hover:text-primary-600">
                  +7 (495) 123-45-67
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600 flex-shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
                <a href="mailto:info@vetclinic.ru" className="text-neutral-600 hover:text-primary-600">
                  info@vetclinic.ru
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600 flex-shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Часы работы</h3>
                <p className="text-neutral-600">Ежедневно с 9:00 до 21:00</p>
              </div>
            </div>
          </div>

          <div className="aspect-video rounded-lg bg-neutral-100 overflow-hidden">
            <img
              src="/images/map.jpg"
              alt="Карта проезда"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            Написать нам
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Имя"
                placeholder="Введите имя"
                required
              />
              <Input
                label="Фамилия"
                placeholder="Введите фамилию"
              />
            </div>

            <Input
              label="Email"
              type="email"
              placeholder="example@mail.ru"
              required
            />

            <Input
              label="Телефон"
              type="tel"
              placeholder="+7 (___) ___-__-__"
            />

            <Input
              label="Тема"
              placeholder="Кратко опишите вопрос"
              required
            />

            <Textarea
              label="Сообщение"
              placeholder="Опишите ваш вопрос подробнее..."
              rows={6}
              required
            />

            <Button
              type="submit"
              loading={isSubmitting}
              className="w-full sm:w-auto"
            >
              Отправить сообщение
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}