import { DoctorCard } from '@/components/sections/doctor-card';
import { Veterinarian } from '@/types';

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

export const metadata = {
  title: 'Специалисты | ВетКлиника',
  description: 'Наши ветеринары и специалисты клиники с опытом работы и графиком приема',
};

export default async function SpecialistsPage() {
  const veterinarians = await getVeterinarians();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4 font-display">
          Наши специалисты
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Команда квалифицированных ветеринаров, которые любят животных и обожают свое дело
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {veterinarians.length > 0 ? (
          veterinarians.map((doctor: Veterinarian) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-neutral-600">Специалисты временно недоступны</p>
          </div>
        )}
      </div>
    </div>
  );
}