import { FaqAccordion } from '@/components/sections/faq-accordion';

export const metadata = {
  title: 'Вопросы и ответы | ВетКлиника',
  description: 'Ответы на частые вопросы о ветеринарных услугах, записи на прием, оплате и многом другом',
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4 font-display">
          Часто задаваемые вопросы
        </h1>
        <p className="text-lg text-neutral-600">
          Здесь вы найдете ответы на самые популярные вопросы
        </p>
      </div>

      <FaqAccordion />

      <div className="mt-16 text-center card">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
          Не нашли ответ?
        </h2>
        <p className="text-neutral-600 mb-6">
          Свяжитесь с нами, и мы с радостью ответим на ваши вопросы
        </p>
        <a href="/contact" className="btn-primary">
          Написать нам
        </a>
      </div>
    </div>
  );
}