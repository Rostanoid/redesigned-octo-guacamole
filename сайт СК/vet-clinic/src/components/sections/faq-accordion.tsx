'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: '1',
    question: 'Как записаться на прием к ветеринару?',
    answer: 'Вы можете записаться через форму на сайте, по телефону или в мобильном приложении. Мы работаем ежедневно с 9:00 до 21:00.',
  },
  {
    id: '2',
    question: 'Какие документы нужны для первого визита?',
    answer: 'Для первого визита необходимо предъявить паспорт и результаты последних обследований (если есть). Если это первичная вакцинация, возьмите справку о здоровье животного.',
  },
  {
    id: '3',
    question: 'Принимаете ли вы экстренные случаи?',
    answer: 'Да, мы принимаем экстренные случаи 24/7. Для острого тяжести звоните по телефону и наш администратор организует срочный осмотр.',
  },
  {
    id: '4',
    question: 'Можно ли оплатить картой?',
    answer: 'Да, мы принимаем банковские карты всех payment systems, а также наличные и выездную оплату.',
  },
  {
    id: '5',
    question: 'Как подготовить животное к визиту?',
    answer: 'Позаботьтесь, чтобы животное было успокоено перед походом. Не кормите за 4 часа до визита, если планируется анализ крови.',
  },
];

export function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {FAQ_ITEMS.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className="rounded-lg border border-neutral-200 bg-white overflow-hidden"
          >
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-neutral-50"
            >
              <span className="font-semibold text-neutral-900">{item.question}</span>
              <ChevronDown
                className={clsx(
                  'h-5 w-5 text-neutral-500 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            
            <div
              className={clsx(
                'overflow-hidden transition-all duration-200',
                isOpen ? 'max-h-96' : 'max-h-0'
              )}
            >
              <p className="px-6 pb-6 text-neutral-600">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}