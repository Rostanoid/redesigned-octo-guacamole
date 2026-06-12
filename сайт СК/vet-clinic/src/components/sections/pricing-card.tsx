import Link from 'next/link';
import { Check } from 'lucide-react';
import { SubscriptionPlan } from '@/types';

interface PricingCardProps {
  plan: SubscriptionPlan & { isPopular?: boolean };
  onSelect?: (planId: string) => void;
}

export function PricingCard({ plan, onSelect }: PricingCardProps) {
  const isPopular = plan.name === 'Standard';

  return (
    <div className={`card relative flex flex-col h-full ${isPopular ? 'border-primary-500 ring-2 ring-primary-500' : ''}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
          Популярный
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-xl font-bold text-neutral-900 mb-2">{plan.name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-primary-600">{plan.price} ₽</span>
          <span className="text-neutral-500">/мес</span>
        </div>
      </div>

      <ul className="flex-1 space-y-3 mb-6">
        {plan.benefits.map((benefit, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-neutral-600">{benefit}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect?.(plan.id)}
        className={`w-full ${isPopular ? 'btn-primary' : 'btn-secondary'} text-center`}
      >
        Выбрать тариф
      </button>
    </div>
  );
}