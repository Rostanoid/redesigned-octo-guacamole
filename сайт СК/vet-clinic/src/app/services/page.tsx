import { ServiceCard } from '@/components/sections/service-card';
import { Service } from '@/types';
import { Stethoscope, Syringe, Scissors, Microscope, Bone, Activity, HeartPulse, Bath } from 'lucide-react';

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

export const metadata = {
  title: 'Услуги | ВетКлиника',
  description: 'Полный перечень ветеринарных услуг: терапия, вакцинация, хирургия, диагностика, стоматология, груминг',
};

export default async function ServicesPage() {
  const services = await getServices();

  const categories = [
    { slug: 'therapy', name: 'Терапия', icon: Stethoscope },
    { slug: 'vaccination', name: 'Вакцинация', icon: Syringe },
    { slug: 'surgery', name: 'Хирургия', icon: Scissors },
    { slug: 'diagnostics', name: 'Диагностика', icon: Microscope },
    { slug: 'dentistry', name: 'Стоматология', icon: Bone },
    { slug: 'ultrasound', name: 'УЗИ и анализы', icon: Activity },
    { slug: 'grooming', name: 'Груминг', icon: Bath },
    { slug: 'emergency', name: 'Экстренная помощь', icon: HeartPulse },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4 font-display">
          Наши услуги
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Полный спектр ветеринарных услуг для домашних животных любого возраста
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
        {categories.map((category) => (
          <a
            key={category.slug}
            href={`/services/${category.slug}`}
            className="card text-center p-4 hover:shadow-md transition-shadow"
          >
            <category.icon className="h-8 w-8 mx-auto mb-2 text-primary-600" />
            <span className="text-sm font-medium">{category.name}</span>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length > 0 ? (
          services.map((service: Service) => (
            <ServiceCard key={service.id} service={service} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-neutral-600">Услуги временно недоступны</p>
          </div>
        )}
      </div>
    </div>
  );
}