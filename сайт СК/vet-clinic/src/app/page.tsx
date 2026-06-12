import { Hero } from '@/components/sections/hero';
import { ServiceCard } from '@/components/sections/service-card';
import { DoctorCard } from '@/components/sections/doctor-card';
import { ReviewCard } from '@/components/sections/review-card';
import { AppointmentForm } from '@/components/sections/appointment-form';
import { PricingCard } from '@/components/sections/pricing-card';

async function getServices() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/services`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getVeterinarians() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/vets`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getReviews() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/reviews`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

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

export default async function HomePage() {
  const services = await getServices();
  const veterinarians = await getVeterinarians();
  const reviews = await getReviews();
  const plans = await getSubscriptionPlans();

  return (
    <div className="space-y-24 pb-24">
      <Hero />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Популярные услуги
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Мы предоставляем полный спектр ветеринарных услуг для домашних животных
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((service: any) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="/services" className="btn-secondary">
            Все услуги
          </a>
        </div>
      </section>

      <section className="bg-neutral-100 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Наши специалисты
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Команда профессионалов с многолетним опытом работы
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {veterinarians.slice(0, 3).map((doctor: any) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>

          <div className="text-center mt-8">
            <a href="/specialists" className="btn-secondary">
              Все специалисты
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Подписки на онлайн-консультации
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Экономьте время и деньги с нашими специальными тарифами
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan: any) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-accent-50 to-primary-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Отзывы клиентов
              </h2>
              <p className="text-neutral-600">
                Что говорят те, кто уже обращался к нам
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.slice(0, 4).map((review: any) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white shadow-xl ring-1 ring-neutral-200 p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Запишитесь на прием
            </h2>
            <p className="text-neutral-600 mb-6">
              Оставьте заявку и наш администратор свяжется с вами в течение 15 минут
            </p>
            <AppointmentForm />
          </div>
        </div>
      </section>
    </div>
  );
}