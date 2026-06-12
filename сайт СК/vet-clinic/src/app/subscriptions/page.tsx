import { PricingCard } from '@/components/sections/pricing-card';

async function getSubscriptionPlans() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/subscriptions/plans`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export const metadata = {
  title: 'Подписки | ВетКлиника',
  description: 'Подписки на онлайн-консультации для ваших питомцев: Basic, Standard, Premium',
};

export default async function SubscriptionsPage() {
  const plans = await getSubscriptionPlans();

  const defaultPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 990,
      benefits: [
        'Базовая консультация врача',
        'Проверка уровня стресса',
        'Рекомендации по питанию',
        '1 онлайн-консультация в месяц',
      ],
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 1990,
      benefits: [
        'Все из тарифа Basic',
        'Приоритетная очередь',
        'Персональный план ухода',
        '3 онлайн-консультации в месяц',
        'Скидка 10% на услуги клиники',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 3990,
      benefits: [
        'Все из тарифа Standard',
        'Круглосуточная поддержка',
        'Выезд ветеринара на дом',
        'Неограниченные консультации',
        'Скидка 20% на услуги клиники',
        'Бесплатные осмотры',
      ],
    },
  ];

  const displayPlans = plans.length > 0 ? plans : defaultPlans;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4 font-display">
          Подписки на консультации
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Выберите подписку, которая подходит именно вам и вашему питомцу
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
        {displayPlans.map((plan: any) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>

      <div className="card max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">
          Сравнение тарифов
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left font-medium pb-3">Функция</th>
                <th className="font-medium pb-3">Basic</th>
                <th className="font-medium pb-3">Standard</th>
                <th className="font-medium pb-3">Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              <tr>
                <td className="py-3 text-neutral-700">Онлайн-консультации</td>
                <td className="py-3 text-center">1/мес</td>
                <td className="py-3 text-center">3/мес</td>
                <td className="py-3 text-center">Безлимит</td>
              </tr>
              <tr>
                <td className="py-3 text-neutral-700">Приоритетная очередь</td>
                <td className="py-3 text-center">—</td>
                <td className="py-3 text-center">✓</td>
                <td className="py-3 text-center">✓</td>
              </tr>
              <tr>
                <td className="py-3 text-neutral-700">Выезд на дом</td>
                <td className="py-3 text-center">—</td>
                <td className="py-3 text-center">—</td>
                <td className="py-3 text-center">✓</td>
              </tr>
              <tr>
                <td className="py-3 text-neutral-700">Скидка на услуги</td>
                <td className="py-3 text-center">—</td>
                <td className="py-3 text-center">10%</td>
                <td className="py-3 text-center">20%</td>
              </tr>
              <tr>
                <td className="py-3 text-neutral-700">Круглосуточная поддержка</td>
                <td className="py-3 text-center">—</td>
                <td className="py-3 text-center">—</td>
                <td className="py-3 text-center">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}