'use client';

import { PricingCard } from '@/components/sections/pricing-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Моя подписка | ВетКлиника',
};

export default function SubscriptionPage() {
  const subscription = {
    planName: 'Standard',
    status: 'ACTIVE',
    currentPeriodEnd: new Date('2024-08-15'),
    benefits: [
      'Базовая консультация врача',
      'Проверка уровня стресса',
      'Рекомендации по питанию',
      '3 онлайн-консультации в месяц',
      'Приоритетная очередь',
      'Персональный план ухода',
      'Скидка 10% на услуги клиники',
    ],
  };

  return (
    <div className="flex min-h-screen bg-neutral-50 lg:bg-white">
      <main className="flex-1 lg:pl-8">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 font-display">
              Моя подписка
            </h1>
            <p className="text-neutral-600 mt-2">
              Управление и продление подписки
            </p>
          </div>

          <div className="card mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  {subscription.planName}
                </h2>
                <p className="text-neutral-600 mt-1">
                  Действует до {new Date(subscription.currentPeriodEnd).toLocaleDateString('ru-RU')}
                </p>
              </div>
              <Badge variant={subscription.status === 'ACTIVE' ? 'success' : 'warning'}>
                {subscription.status === 'ACTIVE' ? 'Активна' : 'Неактивна'}
              </Badge>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-neutral-900 mb-4">
                Что включено:
              </h3>
              <ul className="space-y-2">
                {subscription.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary-600 mt-0.5">✓</span>
                    <span className="text-neutral-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 pt-4 border-t border-neutral-200">
              <Button variant="outline">
                Отменить подписку
              </Button>
              <Button>
                Продлить
              </Button>
            </div>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">
              Другие тарифы
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PricingCard
                plan={{
                  id: 'basic',
                  name: 'Basic',
                  price: 990,
                  benefits: ['Базовая консультация', '1 консультация/мес'],
                }}
              />
              <PricingCard
                plan={{
                  id: 'premium',
                  name: 'Premium',
                  price: 3990,
                  benefits: ['Все преимущества', 'Неограниченные консультации', 'Выезд на дом'],
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}